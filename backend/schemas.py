from typing import Literal

from pydantic import BaseModel, Field

Classification = Literal["syntax_error", "logic_error", "pass"]


class SubmissionRequest(BaseModel):
    language: str = Field(..., min_length=1, description="Piston language name or alias")
    version: str = Field(
        default="*",
        description='SemVer selector for the runtime; use "*" to auto-select the latest',
    )
    code: str = Field(..., min_length=1, description="Source code to execute")
    stdin: str = Field(
        default="",
        description="Optional standard input passed to the executing program",
    )
    expected_output: str | None = Field(
        default=None,
        description="Optional expected stdout for output validation",
    )
    student_id: str | None = Field(
        default=None,
        description="Optional student identifier to load and save their learning memory",
    )


class SubmissionResponse(BaseModel):
    classification: Classification = Field(
        description="Result classification: syntax_error, logic_error, or pass",
    )
    stdout: str
    stderr: str
    execution_time: int = Field(
        description="Total compile and run wall-clock time in milliseconds",
    )
    feedback: str | None = Field(
        default=None,
        description="Tutoring feedback or Socratic hints personalized based on student learning memory",
    )
    history_context: list[str] | None = Field(
        default=None,
        description="List of recalled past mistakes or feedbacks matching the student history context",
    )
