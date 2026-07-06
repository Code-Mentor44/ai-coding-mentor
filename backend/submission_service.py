import httpx

from classifier import classify_submission
from exceptions import PistonExecutionError, PistonTimeoutError, PistonUnavailableError
from piston import execute_on_piston
from schemas import SubmissionRequest, SubmissionResponse
import student_memory_service

async def process_submission(
    client: httpx.AsyncClient,
    submission: SubmissionRequest,
) -> SubmissionResponse:

    try:
       
        result = await execute_on_piston(
            client=client,
            language=submission.language,
            version=submission.version,
            code=submission.code,
           stdin=submission.stdin,
        )
    
    except httpx.ConnectError as exc:
        raise PistonUnavailableError from exc
    except httpx.TimeoutException as exc:
        raise PistonTimeoutError from exc
    except httpx.HTTPStatusError as exc:
        raise PistonExecutionError(str(exc)) from exc

    classification = classify_submission(
        exit_code=result["exit_code"],
        stdout=result["stdout"],
        stderr=result["stderr"],
        expected_output=submission.expected_output,
    )

    
    # Call Student Learning Memory module to orchestrate feedback and recall history
    memory_result = await student_memory_service.orchestrate_mentoring_and_memory(
        student_id=submission.student_id,
        language=submission.language,
        code=submission.code,
        stdout=result["stdout"],
        stderr=result["stderr"],
        classification=classification,
    )
    

    return SubmissionResponse(
        classification=classification,
        stdout=result["stdout"],
        stderr=result["stderr"],
        execution_time=result["execution_time"],
        feedback=memory_result.get("feedback"),
        history_context=memory_result.get("history_context"),
    )
