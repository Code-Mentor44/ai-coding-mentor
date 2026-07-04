import os
import logging
import dotenv
import cognee

# Ensure environment variables are loaded at startup
dotenv.load_dotenv()

logger = logging.getLogger("cognee_service")


def configure_cognee():
    """
    Configures Cognee LLM and embedding providers based on environment variables.
    This separates the service from a single hardcoded provider,
    making it provider-agnostic and extensible.
    """
    # Read LLM configuration from environment variables
    llm_provider = os.environ.get("LLM_PROVIDER")
    if not llm_provider:
        logger.warning("LLM_PROVIDER environment variable is not configured. Cognee LLM configuration might be incomplete.")
        llm_api_key = None
    else:
        llm_provider = llm_provider.lower()
        cognee.config.set_llm_provider(llm_provider)
        
        llm_model = os.environ.get("LLM_MODEL")
        if llm_model:
            cognee.config.set_llm_model(llm_model)
            
        llm_api_key = os.environ.get("LLM_API_KEY") or os.environ.get(f"{llm_provider.upper()}_API_KEY")
        if llm_api_key:
            cognee.config.set_llm_api_key(llm_api_key)
            
        llm_endpoint = os.environ.get("LLM_ENDPOINT")
        if llm_endpoint:
            cognee.config.set_llm_endpoint(llm_endpoint)

    # Read embedding configuration
    embedding_provider = os.environ.get("EMBEDDING_PROVIDER") or llm_provider
    if not embedding_provider:
        logger.warning("EMBEDDING_PROVIDER environment variable is not configured. Cognee embedding configuration might be incomplete.")
    else:
        embedding_provider = embedding_provider.lower()
        cognee.config.set_embedding_provider(embedding_provider)
        
        embedding_model = os.environ.get("EMBEDDING_MODEL")
        if embedding_model:
            cognee.config.set_embedding_model(embedding_model)
            
        embedding_api_key = os.environ.get("EMBEDDING_API_KEY") or os.environ.get(f"{embedding_provider.upper()}_API_KEY") or llm_api_key
        if embedding_api_key:
            cognee.config.set_embedding_api_key(embedding_api_key)
            
        embedding_endpoint = os.environ.get("EMBEDDING_ENDPOINT")
        if embedding_endpoint:
            cognee.config.set_embedding_endpoint(embedding_endpoint)
            
        embedding_dimensions = os.environ.get("EMBEDDING_DIMENSIONS")
        if embedding_dimensions:
            try:
                cognee.config.set_embedding_dimensions(int(embedding_dimensions))
            except (ValueError, TypeError):
                pass


# Run configuration at startup
configure_cognee()


def serialize_recall_result(result):
    """
    Converts Cognee's recall responses into standard JSON-serializable dictionaries.
    Handles lists, Pydantic models (v1/v2), objects with dict representations, and raw types.
    """
    if isinstance(result, list):
        return [serialize_recall_result(item) for item in result]

    if hasattr(result, "model_dump") and callable(result.model_dump):
        return result.model_dump()
    elif hasattr(result, "dict") and callable(result.dict):
        return result.dict()
    elif hasattr(result, "__dict__"):
        return {k: serialize_recall_result(v) for k, v in result.__dict__.items() if not k.startswith("_")}
    else:
        return str(result)


def extract_text_from_recall_result(result) -> list[str]:
    """
    Helper function to recursively traverse serialized Cognee recall outputs
    and extract meaningful text descriptions/content.
    """
    texts = []
    if isinstance(result, list):
        for item in result:
            texts.extend(extract_text_from_recall_result(item))
    elif isinstance(result, dict):
        # Look for standard keys first
        for key in ["answer", "context", "text", "description", "content", "value"]:
            if key in result and result[key]:
                texts.append(str(result[key]))
        # Recursively search other keys
        for k, v in result.items():
            if k not in ["answer", "context", "text", "description", "content", "value"]:
                if isinstance(v, (dict, list)):
                    texts.extend(extract_text_from_recall_result(v))
                elif isinstance(v, str) and len(v.strip()) > 15:
                    texts.append(v.strip())
    elif isinstance(result, str):
        if len(result.strip()) > 10:
            texts.append(result.strip())
    
    # Filter out common boilerplate or empty/very short results
    clean_texts = []
    for text in texts:
        if text.strip() and not any(boilerplate in text for boilerplate in ["ResponseQAEntry", "ResponseGraph"]):
            clean_texts.append(text.strip())
            
    return list(set(clean_texts))


async def remember_data(
    data: str,
    dataset_name: str = "main_dataset",
    session_id: str | None = None,
) -> dict:
    """
    Store text memory or instructions into Cognee's graph structure.
    Uses Cognee's V1.2 remember(..., dataset_name=...) API signature.
    """
    logger.info(f"Remembering content in dataset '{dataset_name}' (session_id: {session_id})")

    try:
        if session_id:
            result = await cognee.remember(data, dataset_name=dataset_name, session_id=session_id)
        else:
            result = await cognee.remember(data, dataset_name=dataset_name)

        return {
            "status": getattr(result, "status", "completed"),
            "dataset_name": getattr(result, "dataset_name", dataset_name),
            "elapsed_seconds": getattr(result, "elapsed_seconds", 0.0),
        }
    except Exception as exc:
        logger.exception("Failed to remember data in Cognee.")
        raise exc


async def recall_data(
    query: str,
    dataset_name: str = "main_dataset",
    session_id: str | None = None,
) -> list:
    """
    Retrieve contextual details from the knowledge graph using a semantic query.
    Uses Cognee's V1.2 recall(..., datasets=[...]) API signature.
    """
    logger.info(f"Recalling context for query '{query}' from datasets: ['{dataset_name}']")

    try:
        if session_id:
            results = await cognee.recall(query_text=query, datasets=[dataset_name], session_id=session_id)
        else:
            results = await cognee.recall(query_text=query, datasets=[dataset_name])

        return serialize_recall_result(results)
    except Exception as exc:
        logger.exception("Failed to recall data from Cognee.")
        raise exc


async def improve_graph(
    dataset_name: str = "main_dataset",
    session_ids: list[str] | None = None,
) -> dict:
    """
    Enriches the knowledge graph by running graph compilation, node triplet calculations,
    and semantic vector index rebuilding.
    """
    logger.info(f"Triggering Cognee improve pipeline for dataset: '{dataset_name}'")

    try:
        if session_ids:
            result = await cognee.improve(dataset=dataset_name, session_ids=session_ids)
        else:
            result = await cognee.improve(dataset=dataset_name)

        return {
            "status": "success",
            "dataset_name": dataset_name,
            "result": str(result),
        }
    except Exception as exc:
        logger.exception("Failed to run Cognee graph improvement.")
        raise exc


async def prune_dataset(dataset_name: str) -> dict:
    """
    Cleans out data for a specific dataset/student profile using prune data.
    """
    logger.info(f"Pruning data for dataset: '{dataset_name}'")
    try:
        await cognee.prune.prune_data()
        return {"status": "success", "dataset_name": dataset_name}
    except Exception as exc:
        logger.exception(f"Failed to prune dataset '{dataset_name}'.")
        raise exc
