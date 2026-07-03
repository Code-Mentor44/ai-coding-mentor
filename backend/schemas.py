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
    expected_output: str | None = Field(
        default=None,
        description="Optional expected stdout for output validation",
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
