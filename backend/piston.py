import httpx
import os

PISTON_EXECUTE_URL = os.getenv("PISTON_API_URL", "http://localhost:2000/api/v2/execute")
PISTON_REQUEST_TIMEOUT = 30.0

LANGUAGE_FILENAMES: dict[str, str] = {
    "python": "main.py",
    "python3": "main.py",
    "javascript": "main.js",
    "js": "main.js",
    "node": "main.js",
    "typescript": "main.ts",
    "ts": "main.ts",
    "cpp": "main.cpp",
    "c++": "main.cpp",
    "c": "main.c",
    "java": "Main.java",
    "go": "main.go",
    "rust": "main.rs",
    "ruby": "main.rb",
    "php": "main.php",
    "bash": "main.sh",
    "sh": "main.sh",
}


def get_main_filename(language: str) -> str:
    return LANGUAGE_FILENAMES.get(language.lower(), f"main.{language.lower()}")


def _stage_wall_time_ms(stage: dict | None) -> int:
    if not stage:
        return 0
    return int(stage.get("wall_time") or stage.get("cpu_time") or 0)


def _combine_stderr(compile_stage: dict | None, run_stage: dict | None) -> str:
    parts: list[str] = []
    if compile_stage and compile_stage.get("stderr"):
        parts.append(compile_stage["stderr"])
    if run_stage and run_stage.get("stderr"):
        parts.append(run_stage["stderr"])
    return "".join(parts)


def parse_piston_response(data: dict) -> dict:
    compile_stage = data.get("compile")
    run_stage = data.get("run") or {}

    compile_time_ms = _stage_wall_time_ms(compile_stage)
    run_time_ms = _stage_wall_time_ms(run_stage)

    return {
        "stdout": run_stage.get("stdout") or "",
        "stderr": _combine_stderr(compile_stage, run_stage),
        "execution_time": compile_time_ms + run_time_ms,
        "exit_code": run_stage.get("code"),
    }


async def execute_on_piston(
    client: httpx.AsyncClient,
    language: str,
    version: str,
    code: str,
    stdin: str = "",
) -> dict:
    payload = {
        "language": language,
        "version": version,
        "files": [
            {
                "name": get_main_filename(language),
                "content": code,
            }
        ],
        "stdin": stdin,
    }

    response = await client.post(PISTON_EXECUTE_URL, json=payload)

    if response.is_error:
        message = response.text
        try:
            error_body = response.json()
            message = error_body.get("message", message)
        except ValueError:
            pass
        raise httpx.HTTPStatusError(
            message,
            request=response.request,
            response=response,
        )

    return parse_piston_response(response.json())
