import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Submit code for execution and evaluation.
 * @param {Object} payload - The submission payload.
 * @param {string} payload.language - Piston language name or alias (e.g. "java", "cpp", "python", "javascript").
 * @param {string} payload.code - Source code to execute.
 * @param {string} [payload.version="*"] - SemVer selector for the runtime.
 * @param {string|null} [payload.expected_output=null] - Optional expected stdout.
 * @param {string|null} [payload.student_id=null] - Optional student identifier.
 * @returns {Promise<Object>} The submission response containing execution details and tutor feedback.
 */
export const submitCode = async ({
  language,
  code,
  version = "*",
  stdin = "",
  expected_output = null,
  student_id = null,
}) => {
  console.log({
    language,
    code,
    stdin,
    version,
    expected_output,
    student_id,
  });
  const response = await api.post("/api/submit", {
    language,
    code,
    version,
    stdin,
    expected_output,
    student_id,
  });

  return response.data;
};
export default api;
