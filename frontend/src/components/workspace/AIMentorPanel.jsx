import { useState } from "react";
import {
  Bot,
  Brain,
  Sparkles,
  Code2,
  Bug,
  ClipboardCheck,
  GraduationCap,
  Briefcase,
  Trophy,
  Lightbulb,
  Send,
  BarChart3,
  Flame,
  Target,
  BookOpen,
} from "lucide-react";

export default function AIMentorPanel() {

  // ============================
  // AI MODES
  // ============================

  const modes = [
    {
      id: "learning",
      title: "Learning Mode",
      icon: <BookOpen size={18} />,
      color: "cyan",
    },
    {
      id: "interview",
      title: "Interview Mode",
      icon: <Briefcase size={18} />,
      color: "violet",
    },
    {
      id: "cp",
      title: "Competitive Programming",
      icon: <Trophy size={18} />,
      color: "green",
    },
  ];

  // ============================
  // QUICK TOOLS
  // ============================

  const tools = [
    {
      id: "concept",
      title: "Explain Concepts",
      icon: <GraduationCap size={22} />,
    },
    {
      id: "optimize",
      title: "Optimize Code",
      icon: <Sparkles size={22} />,
    },
    {
      id: "debug",
      title: "Debug Solution",
      icon: <Bug size={22} />,
    },
    {
      id: "complexity",
      title: "Complexity",
      icon: <Brain size={22} />,
    },
    {
      id: "tests",
      title: "Generate Test Cases",
      icon: <ClipboardCheck size={22} />,
    },
    {
      id: "interview",
      title: "Interview Prep",
      icon: <Briefcase size={22} />,
    },
  ];

  // ============================
  // QUICK PROMPTS
  // ============================

  const quickPrompts = [
    "Explain Dynamic Programming",
    "Optimize my Java code",
    "Binary Search Interview Questions",
    "Generate Test Cases",
    "System Design Basics",
    "Resume Tips",
  ];

  // ============================
  // DAILY AI TIPS
  // ============================

  const tips = [
    "Always solve the brute-force solution before optimizing.",
    "Naming variables clearly improves interview performance.",
    "Practice one difficult problem every weekend.",
    "Understand WHY an algorithm works instead of memorizing it.",
    "Write edge test cases before submitting.",
  ];

  const randomTip =
    tips[Math.floor(Math.random() * tips.length)];

  // ============================
  // DEFAULT RESPONSE
  // ============================

  const defaultResponse = `
👋 Welcome to your AI Coding Mentor!

Choose a learning mode, click a quick prompt, or ask any coding-related question.

I can help you with:

• DSA Concepts
• Interview Preparation
• Competitive Programming
• Code Optimization
• Debugging
• Time & Space Complexity
• Test Case Generation

Select a feature to get started.
`;

  // ============================
  // STATES
  // ============================

  const [mode, setMode] = useState("learning");

  const [response, setResponse] = useState(defaultResponse);

  const [question, setQuestion] = useState("");

  // ============================
  // PREDEFINED AI RESPONSES
  // ============================

  const aiResponses = {
    concept: `
Dynamic Programming is an optimization technique that stores
previously computed results to avoid repeated calculations.

Common DP Problems

• Fibonacci
• Knapsack
• LCS
• Coin Change
• Matrix Chain Multiplication

Always identify:
1. State
2. Transition
3. Base Case
`,

    optimize: `
Optimization Suggestions

✔ Use HashMap instead of nested loops.

✔ Avoid unnecessary traversals.

✔ Remove repeated calculations.

Estimated Complexity

Time : O(n)

Space : O(n)
`,

    debug: `
Possible Issues

• Missing edge cases

• Null pointer checks

• Integer overflow

• Wrong loop condition

• Incorrect recursion base case

• Missing return statement
`,

    complexity: `
Estimated Complexity

Time Complexity

O(n log n)

Space Complexity

O(1)

Your solution is efficient for large constraints.
`,

    tests: `
Suggested Test Cases

[]

[1]

[1,2,3]

Duplicate values

Negative numbers

Maximum constraints

Random large inputs
`,

    interview: `
Top Interview Questions

• Explain HashMap.

• Difference between Stack & Queue.

• What is Dynamic Programming?

• Explain Binary Search.

• Difference between ArrayList and LinkedList.

• Tell me about yourself.
`,
  };

  // ============================
  // ASK AI FUNCTION
  // ============================

  const askAI = () => {
    const q = question.toLowerCase();

    if (q.includes("dynamic") || q.includes("dp")) {
      setResponse(aiResponses.concept);
    }

    else if (
      q.includes("optimize") ||
      q.includes("performance")
    ) {
      setResponse(aiResponses.optimize);
    }

    else if (
      q.includes("bug") ||
      q.includes("debug") ||
      q.includes("error")
    ) {
      setResponse(aiResponses.debug);
    }

    else if (
      q.includes("complexity") ||
      q.includes("time")
    ) {
      setResponse(aiResponses.complexity);
    }

    else if (
      q.includes("test")
    ) {
      setResponse(aiResponses.tests);
    }

    else if (
      q.includes("interview")
    ) {
      setResponse(aiResponses.interview);
    }

    else {

      setResponse(`
AI Backend Integration

This feature is currently running on frontend demo data.

Once the backend AI is connected, you'll receive
real-time AI-generated answers for any coding question.
`);

    }

    setQuestion("");
  };

  return (

    <div className="space-y-6">

      {/* ===========================
            HEADER
      =========================== */}

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

              <Bot
                size={34}
                className="text-cyan-300"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                AI Coding Mentor
              </h1>

              <p className="text-gray-400 mt-2">
                Your personal AI coach for coding,
                interviews and competitive programming.
              </p>

            </div>

          </div>

          <div className="flex gap-3 flex-wrap">

            {modes.map((item) => (

              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`px-5 py-3 rounded-2xl transition flex items-center gap-2

                ${
                  mode === item.id
                    ? "bg-cyan-500 text-black font-semibold"
                    : "bg-white/5 border border-white/10 hover:border-cyan-400"
                }`}
              >
                {item.icon}

                {item.title}

              </button>

            ))}

          </div>

        </div>

      </div>
            {/* ===========================
            ASK AI
      =========================== */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

        <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">

          <Bot className="text-cyan-400" />

          Ask Your AI Mentor

        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything... (Example: Explain Binary Search)"
            className="flex-1 rounded-xl bg-[#111827] border border-white/10 px-5 py-4 outline-none focus:border-cyan-400 transition"
          />

          <button
            onClick={askAI}
            className="px-8 py-4 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
          >
            <Send size={18} />

            Ask AI

          </button>

        </div>

      </div>

      {/* ===========================
            QUICK PROMPTS
      =========================== */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

        <h2 className="text-xl font-semibold mb-5">

          🔥 Popular Prompts

        </h2>

        <div className="flex flex-wrap gap-3">

          {quickPrompts.map((prompt) => (

            <button
              key={prompt}
              onClick={() => {

                if (prompt.includes("Dynamic"))
                  setResponse(aiResponses.concept);

                else if (prompt.includes("Optimize"))
                  setResponse(aiResponses.optimize);

                else if (prompt.includes("Interview"))
                  setResponse(aiResponses.interview);

                else if (prompt.includes("Test"))
                  setResponse(aiResponses.tests);

                else
                  setResponse(`
System Design Basics

Frontend

Backend

Database

API Layer

Authentication

Deployment

These topics will be explained in detail
after backend AI integration.
`);

              }}
              className="rounded-full px-5 py-3 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black transition"
            >

              {prompt}

            </button>

          ))}

        </div>

      </div>

      {/* ===========================
            LEARNING HUB
      =========================== */}

      <div>

        <h2 className="text-2xl font-bold mb-5">

          🚀 AI Learning Hub

        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {tools.map((tool) => (

            <button
              key={tool.id}
              onClick={() => setResponse(aiResponses[tool.id])}
              className="group rounded-3xl border border-white/10 bg-white/5 p-7 text-left hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300"
            >

              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition">

                {tool.icon}

              </div>

              <h3 className="text-xl font-semibold mt-5">

                {tool.title}

              </h3>

              <p className="text-gray-400 mt-3 leading-7">

                {tool.id === "concept" &&
                  "Understand difficult DSA concepts with easy explanations and examples."}

                {tool.id === "optimize" &&
                  "Improve runtime, memory usage and write cleaner code."}

                {tool.id === "debug" &&
                  "Identify logical mistakes, syntax errors and hidden bugs."}

                {tool.id === "complexity" &&
                  "Analyze Time and Space Complexity instantly."}

                {tool.id === "tests" &&
                  "Generate edge cases and custom test inputs automatically."}

                {tool.id === "interview" &&
                  "Practice coding interviews and HR questions with AI guidance."}

              </p>

            </button>

          ))}

        </div>

      </div>
            {/* ===========================
            AI RESPONSE
      =========================== */}

      <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6">

        <div className="flex items-center gap-3 mb-5">

          <Bot
            className="text-cyan-400"
            size={28}
          />

          <h2 className="text-2xl font-bold">
            AI Response
          </h2>

        </div>

        <div className="rounded-2xl bg-[#111827] border border-white/10 p-6 min-h-[280px]">

          <pre className="whitespace-pre-wrap text-gray-300 leading-8 font-sans">

            {response}

          </pre>

        </div>

      </div>

      {/* ===========================
            PROGRESS + DAILY TIP
      =========================== */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Progress */}

        <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">

          <div className="flex items-center gap-3 mb-6">

            <BarChart3
              className="text-green-400"
              size={26}
            />

            <h2 className="text-2xl font-bold">

              Your Progress

            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-white/5 p-5 border border-white/10">

              <Code2
                className="text-cyan-400 mb-3"
                size={24}
              />

              <p className="text-gray-400 text-sm">

                Problems Solved

              </p>

              <h3 className="text-3xl font-bold mt-2">

                18

              </h3>

            </div>

            <div className="rounded-2xl bg-white/5 p-5 border border-white/10">

              <Target
                className="text-yellow-400 mb-3"
                size={24}
              />

              <p className="text-gray-400 text-sm">

                Success Rate

              </p>

              <h3 className="text-3xl font-bold mt-2 text-yellow-300">

                82%

              </h3>

            </div>

            <div className="rounded-2xl bg-white/5 p-5 border border-white/10">

              <Flame
                className="text-orange-400 mb-3"
                size={24}
              />

              <p className="text-gray-400 text-sm">

                Current Streak

              </p>

              <h3 className="text-3xl font-bold mt-2 text-orange-300">

                7 Days

              </h3>

            </div>

            <div className="rounded-2xl bg-white/5 p-5 border border-white/10">

              <Brain
                className="text-violet-400 mb-3"
                size={24}
              />

              <p className="text-gray-400 text-sm">

                Recommended Topic

              </p>

              <h3 className="text-xl font-bold mt-2 text-violet-300">

                Trees 🌳

              </h3>

            </div>

          </div>

        </div>

        {/* Today's Tip */}

        <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6">

          <div className="flex items-center gap-3 mb-6">

            <Lightbulb
              className="text-yellow-300"
              size={28}
            />

            <h2 className="text-2xl font-bold">

              Today's AI Tip

            </h2>

          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">

            <p className="text-lg text-gray-200 leading-9">

              💡 {randomTip}

            </p>

          </div>

          <div className="mt-8">

            <h3 className="font-semibold text-cyan-300 mb-4">

              Recommended Next Step

            </h3>

            <div className="space-y-3">

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">

                📘 Learn Dynamic Programming basics.

              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">

                💻 Solve 2 Medium Array problems.

              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">

                🎯 Attempt one mock interview today.

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ===========================
            AI FEATURES OVERVIEW
      =========================== */}

      <div className="rounded-3xl border border-violet-500/20 bg-violet-500/10 p-6">

        <h2 className="text-2xl font-bold mb-6">

          🚀 What Your AI Mentor Can Do

        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

            <GraduationCap
              className="text-cyan-400 mb-4"
              size={28}
            />

            <h3 className="font-semibold">

              Learn Concepts

            </h3>

            <p className="text-sm text-gray-400 mt-3">

              Understand DSA topics with simple explanations and examples.

            </p>

          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

            <Sparkles
              className="text-green-400 mb-4"
              size={28}
            />

            <h3 className="font-semibold">

              Optimize Solutions

            </h3>

            <p className="text-sm text-gray-400 mt-3">

              Improve runtime and memory usage with AI suggestions.

            </p>

          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

            <Bug
              className="text-red-400 mb-4"
              size={28}
            />

            <h3 className="font-semibold">

              Debug Faster

            </h3>

            <p className="text-sm text-gray-400 mt-3">

              Detect common mistakes and edge cases before submission.

            </p>

          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

            <Briefcase
              className="text-yellow-400 mb-4"
              size={28}
            />

            <h3 className="font-semibold">

              Crack Interviews

            </h3>

            <p className="text-sm text-gray-400 mt-3">

              Practice coding interviews with AI-generated guidance.

            </p>

          </div>

        </div>

      </div>
            {/* ===========================
            FINAL CTA
      =========================== */}

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          <div>

            <h2 className="text-3xl font-bold">

              🚀 Keep Learning with AI

            </h2>

            <p className="text-gray-300 mt-3 max-w-2xl leading-8">

              Practice consistently, improve your coding skills, and prepare
              for technical interviews with the help of your AI Coding Mentor.
              More intelligent AI-powered features will be unlocked after backend
              integration.

            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <button
                onClick={() => {
                    setMode("learning");
                    setResponse(aiResponses.concept);

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 transition"
            >
                📘 Start Learning
            </button>

            <button
                onClick={() => {
                    setMode("interview");
                    setResponse(aiResponses.interview);

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
                className="px-6 py-3 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-black transition"
            >
                💼 Interview Prep
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}