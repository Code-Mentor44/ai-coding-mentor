from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from exceptions import PistonExecutionError, PistonTimeoutError, PistonUnavailableError
from piston import PISTON_REQUEST_TIMEOUT
from schemas import SubmissionRequest, SubmissionResponse
from submission_service import process_submission


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.http_client = httpx.AsyncClient(timeout=PISTON_REQUEST_TIMEOUT)
    yield
    await app.state.http_client.aclose()


app = FastAPI(
    title="AI Coding Mentor API",
    description="Backend for the AI coding mentor hackathon project",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "message": "Backend is running"}


@app.post("/api/submit", response_model=SubmissionResponse)
async def submit_code(
    submission: SubmissionRequest,
    request: Request,
) -> SubmissionResponse:
    client: httpx.AsyncClient = request.app.state.http_client

    try:
        return await process_submission(client, submission)
    except PistonUnavailableError as exc:
        raise HTTPException(
            status_code=503,
            detail="Unable to reach the Piston code execution engine at http://localhost:2000",
        ) from exc
    except PistonTimeoutError as exc:
        raise HTTPException(
            status_code=504,
            detail="Piston code execution timed out",
        ) from exc
    except PistonExecutionError as exc:
        raise HTTPException(
            status_code=502,
            detail=exc.message,
        ) from exc
