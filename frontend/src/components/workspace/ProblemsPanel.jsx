import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  PlayCircle,
  Code2,
  Trophy,
} from "lucide-react";
import { problems } from "../../data/problems";

export default function ProblemsPanel({
  setActiveTab,
  setSelectedProblem,
}) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(search.toLowerCase()) ||
        problem.topic.toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty =
        difficulty === "All" || problem.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficulty]);

  const solvedCount = problems.filter((p) => p.solved).length;

  const recommended = problems[0];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-6">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>
            <h1 className="text-3xl font-bold">
              📚 Problem Explorer
            </h1>

            <p className="text-gray-400 mt-2">
              Practice coding interview questions and improve your problem-solving skills.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="rounded-xl bg-white/5 p-4 border border-white/10 text-center">
              <p className="text-sm text-gray-400">Total</p>
              <h2 className="text-2xl font-bold">{problems.length}</h2>
            </div>

            <div className="rounded-xl bg-white/5 p-4 border border-white/10 text-center">
              <p className="text-sm text-gray-400">Solved</p>
              <h2 className="text-2xl font-bold text-green-400">
                {solvedCount}
              </h2>
            </div>

          </div>

        </div>

      </div>

      {/* Recommended */}

      <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <p className="text-cyan-400 font-semibold text-sm">
              ⭐ Recommended Today
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {recommended.title}
            </h2>

            <p className="text-gray-400 mt-2">
              Perfect for today's practice session.
            </p>

            <div className="flex gap-3 mt-4 flex-wrap">

              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                {recommended.difficulty}
              </span>

              <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
                {recommended.topic}
              </span>

            </div>

          </div>

          <button
            onClick={() => {
              setSelectedProblem(recommended);
              setActiveTab("dashboard");
            }}
            className="self-start bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
          >
            Continue Solving →
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

        <div className="flex flex-col lg:flex-row gap-4 justify-between">

          <div className="relative w-full lg:max-w-md">

            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or topic..."
              className="w-full bg-[#111827] border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-cyan-400"
            />

          </div>

          <div className="flex flex-wrap gap-3">

            {["All", "Easy", "Medium", "Hard"].map((item) => (

              <button
                key={item}
                onClick={() => setDifficulty(item)}
                className={`px-5 py-2 rounded-xl transition
                ${
                  difficulty === item
                    ? "bg-cyan-500 text-black font-semibold"
                    : "bg-white/5 border border-white/10 hover:border-cyan-400"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </div>

      {/* Problem List */}

      <div className="space-y-5">

        {filteredProblems.length === 0 && (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">

            <Code2
              size={50}
              className="mx-auto text-gray-500"
            />

            <h2 className="text-2xl font-bold mt-5">
              No Problems Found
            </h2>

            <p className="text-gray-400 mt-2">
              Try changing your search or filter.
            </p>

          </div>

        )}

        {filteredProblems.map((problem) => (

          <div
            key={problem.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400 hover:-translate-y-1 transition-all duration-300"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              <div>

                <div className="flex items-center gap-3 flex-wrap">

                  <h2 className="text-2xl font-semibold">
                    {problem.title}
                  </h2>

                  {problem.solved && (
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                      <CheckCircle size={16} />
                      Solved
                    </span>
                  )}

                </div>

                <p className="text-gray-400 mt-2">
                  {problem.topic}
                </p>

                <div className="flex gap-3 mt-5 flex-wrap">

                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      problem.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-300"
                        : problem.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {problem.difficulty}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                    ⭐ +100 XP
                  </span>

                  <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
                    ⏱ 20 min
                  </span>

                </div>

              </div>

              <div className="flex items-center">

                <button
                  onClick={() => {
                    setSelectedProblem(problem);
                    setActiveTab("dashboard");
                  }}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
                >
                  <PlayCircle size={18} />
                  Solve Problem
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}