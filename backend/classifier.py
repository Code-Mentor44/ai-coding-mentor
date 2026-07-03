from schemas import Classification


def classify_submission(
    exit_code: int | None,
    stdout: str,
    stderr: str,
    expected_output: str | None,
) -> Classification:
    if exit_code != 0 or bool(stderr):
        return "syntax_error"

    if expected_output is not None:
        if stdout.strip() != expected_output.strip():
            return "logic_error"

    return "pass"
