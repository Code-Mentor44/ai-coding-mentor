import { createContext, useContext, useState } from "react";
import { submitCode as apiSubmitCode } from "../services/api";

const EditorContext = createContext();

const templates = {
  CP: {
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{};
    }
}`,
    cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        return {};
    }
};`,
    python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        return []
`,
    javascript: `function twoSum(nums, target) {
    return [];
}`
  },
  Exam: {
    java: `/*
======================================
          ONLINE ASSESSMENT
======================================
Question 1
Solve the given problem. Good Luck!
*/
class Solution {
    public int[] solve(int[] nums, int target) {
        return new int[]{};
    }
}`,
    cpp: `/*
======================================
          ONLINE ASSESSMENT
======================================
Question 1
Solve the given problem. Good Luck!
*/
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> solve(vector<int>& nums, int target) {
        return {};
    }
};`,
    python: `"""
======================================
          ONLINE ASSESSMENT
======================================
Question 1
Solve the given problem. Good Luck!
"""
class Solution:
    def solve(self, nums: list[int], target: int) -> list[int]:
        return []
`,
    javascript: `/*
======================================
          ONLINE ASSESSMENT
======================================
Question 1
Solve the given problem. Good Luck!
*/
function solve(nums, target) {
    return [];
}`
  }
};

// Generate and retrieve unique guest student ID
const getOrCreateStudentId = () => {
  let id = localStorage.getItem("student_id");
  if (!id) {
    id = "student_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    localStorage.setItem("student_id", id);
  }
  return id;
};

export function EditorProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [mode, setMode] = useState("CP");
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(templates.CP.java);
  const [studentId] = useState(getOrCreateStudentId);

  const [result, setResult] = useState({
    status: "Waiting",
    execution: "--",
    memory: "--",
    score: "--",
    language: "Java",
    stdout: "",
    stderr: "",
    error: null,
  });

  const [aiResponse, setAiResponse] = useState({
    logic: "No feedback yet.",
    complexity: "--",
    optimization: "--",
  });

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    setCode(templates[mode][newLang] || "");
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setCode(templates[newMode][language] || "");
  };

  const runCode = async () => {
    setLoading(true);
    setResult((prev) => ({
      ...prev,
      status: "Running...",
      error: null,
      stdout: "",
      stderr: "",
    }));

    try {
      const data = await apiSubmitCode({
        language,
        code,
        student_id: studentId,
      });

      setResult({
        status: data.classification === "pass" ? "Accepted" : (data.classification === "syntax_error" ? "Syntax Error" : "Logic Error"),
        execution: `${data.execution_time} ms`,
        memory: "N/A",
        score: data.classification === "pass" ? "100" : "0",
        language: language.charAt(0).toUpperCase() + language.slice(1),
        stdout: data.stdout || "",
        stderr: data.stderr || "",
        error: null,
      });
    } catch (err) {
      console.error("API error during runCode:", err);
      const errorMessage = err.response?.data?.detail || err.message || "Failed to execute code.";
      setResult((prev) => ({
        ...prev,
        status: "Error",
        execution: "--",
        memory: "--",
        score: "--",
        stdout: "",
        stderr: "",
        error: errorMessage,
      }));
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async () => {
    setAiLoading(true);
    setLoading(true);
    setResult((prev) => ({
      ...prev,
      status: "Running...",
      error: null,
      stdout: "",
      stderr: "",
    }));
    setAiResponse({
      logic: "🤖 AI is analyzing your solution...",
      complexity: "--",
      optimization: "--",
    });

    try {
      const data = await apiSubmitCode({
        language,
        code,
        student_id: studentId,
      });

      setResult({
        status: data.classification === "pass" ? "Accepted" : (data.classification === "syntax_error" ? "Syntax Error" : "Logic Error"),
        execution: `${data.execution_time} ms`,
        memory: "N/A",
        score: data.classification === "pass" ? "100" : "0",
        language: language.charAt(0).toUpperCase() + language.slice(1),
        stdout: data.stdout || "",
        stderr: data.stderr || "",
        error: null,
      });

      const feedback = data.feedback || "";
      let logic = feedback;
      let complexity = "--";
      let optimization = "--";

      const complexityMatch = feedback.match(/O\([a-zA-Z0-9\^ ]+\)/i);
      if (complexityMatch) {
        complexity = `Estimated: ${complexityMatch[0]}`;
      } else {
        complexity = "Calculated by AI Mentor";
      }

      const optRegex = /(?:optimization|optimizations|improvement|improvements):\s*([\s\S]+)/i;
      const optMatch = feedback.match(optRegex);
      if (optMatch) {
        optimization = optMatch[1].trim();
        logic = feedback.split(optRegex)[0].trim();
      } else {
        optimization = "Follow Socratic hints above to refactor and optimize.";
      }

      setAiResponse({
        logic: logic || "No mentoring feedback generated.",
        complexity,
        optimization,
      });
    } catch (err) {
      console.error("API error during submitCode:", err);
      const errorMessage = err.response?.data?.detail || err.message || "Failed to submit code for AI review.";
      setResult((prev) => ({
        ...prev,
        status: "Error",
        execution: "--",
        memory: "--",
        score: "--",
        stdout: "",
        stderr: "",
        error: errorMessage,
      }));
      setAiResponse({
        logic: `Error: ${errorMessage}`,
        complexity: "--",
        optimization: "--",
      });
    } finally {
      setLoading(false);
      setAiLoading(false);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        result,
        loading,
        aiLoading,
        aiResponse,
        language,
        code,
        mode,
        studentId,
        changeLanguage,
        changeMode,
        setCode,
        runCode,
        submitCode,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext);
}