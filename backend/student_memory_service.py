import os
import uuid
import logging
import datetime
import asyncio
import cognee_service
from exceptions import RATE_LIMIT_FEEDBACK_MESSAGE, is_rate_limit_error

logger = logging.getLogger("student_memory_service")


def generate_student_session_id() -> str:
    """
    Generates a unique temporary session UUID when no student_id is provided.
    """
    return f"session_{uuid.uuid4()}"


def extract_programming_concept(language: str, classification: str, code: str, stderr: str) -> str:
    """
    Extracts the core programming concept / issue from the submission execution result.
    Uses rule-based classification based on standard compiler/runtime errors.
    """
    if classification == "pass":
        return "success"
        
    stderr_lower = stderr.lower()
    code_lower = code.lower()
    
    # Python specific errors
    if "indentationerror" in stderr_lower or "taberror" in stderr_lower:
        return "python_indentation"
    if "zerodivisionerror" in stderr_lower:
        return "division_by_zero"
    if "typeerror" in stderr_lower:
        return "type_mismatch"
    if "nameerror" in stderr_lower:
        return "undefined_variable"
    if "indexerror" in stderr_lower:
        return "array_out_of_bounds"
        
    # JavaScript specific errors
    if "referenceerror" in stderr_lower:
        return "undefined_variable"
    if "cannot read properties of undefined" in stderr_lower or "cannot read property" in stderr_lower:
        return "null_pointer_access"
        
    # C++ / C general errors
    if "was not declared in this scope" in stderr_lower:
        return "undefined_variable"
    if "segmentation fault" in stderr_lower or "segfault" in stderr_lower:
        return "memory_safety"
        
    # General logic error rules
    if classification == "logic_error":
        # Check if code involves division or loops to guess concept
        if "/" in code_lower and ("while" in code_lower or "for" in code_lower):
            return "loop_math_logic"
        if "if" in code_lower and "==" in code_lower:
            return "conditional_logic"
        return "general_logical_error"
        
    return "general_syntax_error"


def build_learning_record(
    language: str,
    classification: str,
    concept: str,
    feedback: str,
    metadata: dict = None,
) -> dict:
    """
    Constructs a structured learning record dictionary for database/graph ingestion.
    """
    return {
        "language": language,
        "classification": classification,
        "concept": concept,
        "feedback": feedback,
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "metadata": metadata or {},
    }


async def record_learning_attempt(student_id: str, record: dict) -> dict:
    """
    Converts a structured learning record to a text summary and stores it in Cognee.
    """
    dataset_name = f"student_{student_id}"
    
    # Format a structured summary text for memory ingestion
    data_string = (
        f"Learning Attempt Record:\n"
        f"- Timestamp: {record['timestamp']}\n"
        f"- Language: {record['language']}\n"
        f"- Classification: {record['classification']}\n"
        f"- Concept: {record['concept']}\n"
        f"- Feedback Provided: {record['feedback']}\n"
        f"- Metadata: {record['metadata']}"
    )
    
    try:
        # Save structured record using Cognee
        result = await cognee_service.remember_data(data_string, dataset_name=dataset_name)

        # Schedule graph improvement in the background so it doesn't block the API response
        asyncio.create_task(cognee_service.improve_graph(dataset_name=dataset_name))
        
        return result
    except Exception as exc:
        logger.error(f"Failed to record learning attempt in memory: {exc}")
        return {"status": "failed", "error": str(exc)}


async def recall_student_history(student_id: str, concept: str) -> list[str]:
    """
    Queries Cognee to retrieve the student's past attempts and feedback for the specific concept.
    """
    dataset_name = f"student_{student_id}"
    query = f"Student attempts and feedback for concept: {concept}"

    try:
        results = await cognee_service.recall_data(query, dataset_name=dataset_name)
        if not results:
            return []

        return cognee_service.extract_text_from_recall_result(results)
    except Exception as exc:
        if is_rate_limit_error(exc):
            logger.warning("Gemini quota/rate limit during student history recall; continuing without history.")
            return []

        logger.warning(f"Could not recall student history: {exc}")
        return []


async def generate_mentoring_feedback(
    code: str,
    stdout: str,
    stderr: str,
    classification: str,
    concept: str,
    history: list[str],
) -> str:
    """
    Calls the configured LLM provider via litellm to generate personalized mentoring feedback,
    taking the student's learning history context into account.
    """
    llm_provider = os.environ.get("LLM_PROVIDER")
    if not llm_provider:
        return "Mentoring feedback is unavailable because LLM_PROVIDER is not configured."
    llm_provider = llm_provider.lower()

    llm_api_key = os.environ.get("LLM_API_KEY") or os.environ.get(f"{llm_provider.upper()}_API_KEY")
    if not llm_api_key:
        return f"Mentoring feedback is unavailable because the API key for {llm_provider.upper()} is not configured."

    llm_model = os.environ.get("LLM_MODEL")
    if not llm_model:
        if llm_provider == "openai":
            llm_model = "gpt-4o-mini"
        elif llm_provider == "gemini":
            llm_model = "gemini-1.5-flash"
        else:
            return f"Mentoring feedback is unavailable because LLM_MODEL is not configured for provider {llm_provider}."

    llm_endpoint = os.environ.get("LLM_ENDPOINT")

    # Format model name for litellm if needed
    if "/" in llm_model:
        model_str = llm_model
    elif llm_provider == "openai":
        model_str = llm_model
    else:
        model_str = f"{llm_provider}/{llm_model}"

    # Build history instructions
    if history:
        history_text = "\n".join(f"- Past attempt detail: {h}" for h in history)
        history_instruction = (
            "The student has made similar mistakes in the past. Refer to their past history context below.\n"
            "Gently remind them that they have encountered this issue before and encourage them to apply their previous lessons.\n"
            "Do not give them the direct code fix. Guide them socratically.\n"
            f"Recalled student history context:\n{history_text}"
        )
    else:
        history_instruction = "This is the first time the student has encountered this issue. Give them a fresh, guided hint to help them find and fix it."

    system_prompt = (
        "You are the AI Coding Mentor. Your goal is to guide students to fix their programming bugs.\n"
        "Do not provide a direct copy-paste code solution. Instead, explain the bug conceptually and ask guiding Socratic questions.\n"
        f"{history_instruction}"
    )

    user_prompt = (
        f"Student's Code:\n```\n{code}\n```\n\n"
        f"Execution Results:\n"
        f"- Classification: {classification}\n"
        f"- Stdout: {stdout}\n"
        f"- Stderr: {stderr}\n"
        f"- Identified Concept: {concept}\n\n"
        f"Please provide your personalized mentoring feedback now."
    )

    try:
        from litellm.exceptions import RateLimitError
        import litellm

        kwargs = {
            "model": model_str,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "api_key": llm_api_key,
            "timeout": 30.0,
        }
        if llm_endpoint:
            kwargs["base_url"] = llm_endpoint

        response = await litellm.acompletion(**kwargs)
        return response.choices[0].message.content.strip()
    except RateLimitError as exc:
        logger.warning("Gemini quota/rate limit during mentoring feedback: %s", exc)
        return RATE_LIMIT_FEEDBACK_MESSAGE
    except Exception as exc:
        if is_rate_limit_error(exc):
            logger.warning("Gemini quota/rate limit during mentoring feedback: %s", exc)
            return RATE_LIMIT_FEEDBACK_MESSAGE

        logger.error(f"Error calling LLM in student memory service: {exc}")
        return f"Error generating mentoring feedback: {str(exc)}"


async def orchestrate_mentoring_and_memory(
    student_id: str | None,
    language: str,
    code: str,
    stdout: str,
    stderr: str,
    classification: str,
) -> dict:
    """
    Main orchestration entry point:
    1. Resolves/generates student identifier.
    2. Extracts the programming concept.
    3. Recalls past attempts history context.
    4. Generates personalized feedback based on historical context.
    5. Asynchronously logs the new attempt to learning memory.
    """
    # 1. Resolve student id
    active_student_id = student_id if (student_id and student_id.strip()) else generate_student_session_id()
    
    # 2. Extract programming concept
    concept = extract_programming_concept(language, classification, code, stderr)
    
    # 3. Retrieve past history context
    history = []
    if concept != "success":
        history = await recall_student_history(active_student_id, concept)
        
    # 4. Generate feedback
    if classification == "pass":
        feedback = "All tests passed successfully! Great job!"
    else:
        feedback = await generate_mentoring_feedback(
            code=code,
            stdout=stdout,
            stderr=stderr,
            classification=classification,
            concept=concept,
            history=history,
        )
        
    # 5. Build structured record
    metadata = {
        "stderr_summary": stderr.strip().split("\n")[-1][:120] if stderr else "",
    }
    record = build_learning_record(language, classification, concept, feedback, metadata)
    
    # 6. Store attempt asynchronously
    asyncio.create_task(record_learning_attempt(active_student_id, record))
    
    return {
        "student_id": active_student_id,
        "concept": concept,
        "feedback": feedback,
        "history_context": history,
    }
