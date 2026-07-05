import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useEditor } from "../../context/EditorContext";
import ExamToolbar from "../exam/ExamToolbar";

export default function CodeEditor() {
  const {
    runCode,
    loading,
    submitCode,
    aiLoading,
    language,
    code,
    mode,
    changeLanguage,
    changeMode,
    setCode,
  } = useEditor();

  return (
    <div className="w-full">

      {/* ===== TOP TOOLBAR ===== */}

      <div className="flex items-center justify-between mb-5 flex-wrap gap-4">

        <div className="flex items-center gap-4 flex-wrap">

          {/* Language */}

          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-[#111827]
            border border-gray-700
            rounded-xl
            px-4
            py-2"
          >
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>

          {/* Theme */}

          <select
            className="bg-[#111827]
            border border-gray-700
            rounded-xl
            px-4
            py-2"
          >
            <option>Dark Theme</option>
            <option>Light Theme</option>
          </select>

          {/* Mode Switch */}

          <div className="flex overflow-hidden rounded-xl border border-gray-700">

            <button
              onClick={() => changeMode("CP")}
              className={`px-5 py-2 transition ${
                mode === "CP"
                  ? "bg-cyan-500 text-black font-semibold"
                  : "bg-[#111827] text-gray-300"
              }`}
            >
              CP Mode
            </button>

            <button
              onClick={() => changeMode("Exam")}
              className={`px-5 py-2 transition ${
                mode === "Exam"
                  ? "bg-violet-600 text-white font-semibold"
                  : "bg-[#111827] text-gray-300"
              }`}
            >
              Exam Mode
            </button>

          </div>

        </div>

        {/* Right Buttons */}

        {mode === "CP" ? (

          <div className="flex gap-3">

            <button
              onClick={runCode}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 transition"
            >
              {loading ? "Running..." : "Run"}
            </button>

            <button
              onClick={submitCode}
              disabled={aiLoading}
              className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 disabled:opacity-50 transition"
            >
              {aiLoading ? "Analyzing..." : "Submit"}
            </button>

          </div>

        ) : (

          <button
            className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-400 font-semibold transition"
          >
            End Exam
          </button>

        )}

      </div>
            {/* ================= EXAM TOOLBAR ================= */}

      {mode === "Exam" && (
        <ExamToolbar
          currentQuestion={1}
          totalQuestions={5}
        />
      )}

      {/* ================= EXAM INSTRUCTIONS ================= */}

      {mode === "Exam" && (

        <div className="mb-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

          <h3 className="text-lg font-bold text-yellow-300">
            📋 Assessment Instructions
          </h3>

          <div className="mt-4 grid md:grid-cols-2 gap-4">

            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <h4 className="font-semibold text-cyan-300">
                Rules
              </h4>

              <ul className="mt-3 text-sm text-gray-300 space-y-2">
                <li>• Read every question carefully.</li>
                <li>• Complete within the given time.</li>
                <li>• Auto Save is enabled.</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/5 p-4 border border-white/10">
              <h4 className="font-semibold text-violet-300">
                Evaluation
              </h4>

              <ul className="mt-3 text-sm text-gray-300 space-y-2">
                <li>• Correctness</li>
                <li>• Time Complexity</li>
                <li>• Code Quality</li>
              </ul>
            </div>

          </div>

        </div>

      )}

      {/* ================= MONACO EDITOR ================= */}

      <Editor
        height="420px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(val) => setCode(val || "")}

        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },

          roundedSelection: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,

          lineNumbers: "on",
          glyphMargin: true,

          wordWrap: "on",

          cursorBlinking: "smooth",

          padding: {
            top: 20,
          },
        }}
      />
            {/* ================= EXAM NAVIGATION ================= */}

      {mode === "Exam" && (

        <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

            {/* Left */}

            <div>

              <h3 className="text-lg font-bold">
                Assessment Navigation
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Navigate between questions. Your answers are automatically saved.
              </p>

            </div>

            {/* Center */}

            <div className="flex gap-3">

              <button
                className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
              >
                ⬅ Previous
              </button>

              <button
                className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 transition"
              >
                Next ➜
              </button>

            </div>

            {/* Right */}

            <div className="flex gap-3">

              <button
                className="px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/30 transition"
              >
                🚩 Mark Review
              </button>

              <button
                className="px-4 py-2 rounded-xl bg-green-500/20 border border-green-400/30 text-green-300"
              >
                💾 Auto Saved
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= CP MODE FOOTER ================= */}

      {mode === "CP" && (

        <div className="mt-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold">
                AI Coding Mentor
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Run your code, analyze results and receive AI-powered feedback.
              </p>

            </div>

            <div className="text-right">

              <p className="text-cyan-400 font-semibold">
                Practice Mode
              </p>

              <p className="text-xs text-gray-400">
                Unlimited Attempts
              </p>

            </div>

          </div>

        </div>

      )} 
          </div>
  );
}