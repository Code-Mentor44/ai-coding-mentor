RATE_LIMIT_FEEDBACK_MESSAGE = (
    "AI mentoring feedback is temporarily unavailable because the Gemini API quota has been exceeded."
)


def is_rate_limit_error(exc: BaseException) -> bool:
    """Return True when exc (or its cause/context chain) is a litellm rate-limit error."""
    try:
        from litellm.exceptions import RateLimitError
    except ImportError:
        from litellm import RateLimitError

    if isinstance(exc, RateLimitError):
        return True

    try:
        from tenacity import RetryError
    except ImportError:
        RetryError = ()  # type: ignore[misc, assignment]

    if isinstance(exc, RetryError):
        last_attempt = getattr(exc, "last_attempt", None)
        if last_attempt is not None:
            attempt_exc = last_attempt.exception()
            if attempt_exc is not None and is_rate_limit_error(attempt_exc):
                return True

    for attr in ("__cause__", "__context__"):
        inner = getattr(exc, attr, None)
        if inner is not None and inner is not exc and is_rate_limit_error(inner):
            return True

    return False


class PistonUnavailableError(Exception):
    """Raised when the Piston container cannot be reached."""


class PistonTimeoutError(Exception):
    """Raised when Piston does not respond within the configured timeout."""


class PistonExecutionError(Exception):
    """Raised when Piston returns an HTTP error for the execute request."""

    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(message)
