class PistonUnavailableError(Exception):
    """Raised when the Piston container cannot be reached."""


class PistonTimeoutError(Exception):
    """Raised when Piston does not respond within the configured timeout."""


class PistonExecutionError(Exception):
    """Raised when Piston returns an HTTP error for the execute request."""

    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(message)
