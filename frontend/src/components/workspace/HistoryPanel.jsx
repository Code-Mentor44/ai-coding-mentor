import { useMemo, useState } from "react";
import { Search, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

export default function HistoryPanel() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const submissions = [
    {
      id: 1,
      problem: "Two Sum",
      language: "Java",
      status: "Accepted",
      runtime: "68 ms",
      date: "Today • 10:30 AM",
    },
    {
      id: 2,
      problem: "Merge Two Lists",
      language: "Python",
      status: "Wrong Answer",
      runtime: "--",
      date: "Yesterday",
    },
    {
      id: 3,
      problem: "Binary Search",
      language: "C++",
      status: "Runtime Error",
      runtime: "--",
      date: "2 days ago",
    },
    {
      id: 4,
      problem: "Valid Parentheses",
      language: "JavaScript",
      status: "Accepted",
      runtime: "41 ms",
      date: "3 days ago",
    },
  ];

  const filtered = useMemo(() => {
    return submissions.filter((item) => {
      const matchesSearch = item.problem
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const accepted = submissions.filter(
    (s) => s.status === "Accepted"
  ).length;

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-6">

        <h1 className="text-3xl font-bold">
          📜 Submission History
        </h1>

        <p className="text-gray-400 mt-2">
          Track your coding journey and monitor your progress.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <p className="text-gray-400 text-sm">Total</p>
          <h2 className="text-3xl font-bold">{submissions.length}</h2>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <p className="text-gray-400 text-sm">Accepted</p>
          <h2 className="text-3xl font-bold text-green-400">
            {accepted}
          </h2>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <p className="text-gray-400 text-sm">Failed</p>
          <h2 className="text-3xl font-bold text-red-400">
            {submissions.length - accepted}
          </h2>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
          <p className="text-gray-400 text-sm">Success Rate</p>
          <h2 className="text-3xl font-bold text-cyan-400">
            {Math.round((accepted / submissions.length) * 100)}%
          </h2>
        </div>

      </div>

      {/* Search & Filter */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

        <div className="flex flex-col lg:flex-row gap-4 justify-between">

          <div className="relative lg:w-96">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Problem..."
              className="w-full bg-[#111827] border border-white/10 rounded-xl pl-11 pr-4 py-3 focus:border-cyan-400 outline-none"
            />

          </div>

          <div className="flex flex-wrap gap-3">

            {[
              "All",
              "Accepted",
              "Wrong Answer",
              "Runtime Error",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2 rounded-xl transition ${
                  filter === item
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

      {/* History */}

      <div className="space-y-5">

        {filtered.length === 0 && (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">

            <Clock
              size={48}
              className="mx-auto text-gray-500"
            />

            <h2 className="text-2xl font-bold mt-5">
              No Submissions Found
            </h2>

            <p className="text-gray-400 mt-2">
              Try another search or filter.
            </p>

          </div>

        )}

        {filtered.map((item) => (

          <div
            key={item.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400 transition-all hover:-translate-y-1"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-5">

              <div>

                <h2 className="text-xl font-semibold">
                  {item.problem}
                </h2>

                <p className="text-gray-400 mt-2">
                  {item.language} • {item.runtime}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {item.date}
                </p>

              </div>

              <div className="flex items-center">

                {item.status === "Accepted" && (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                    <CheckCircle size={18} />
                    Accepted
                  </span>
                )}

                {item.status === "Wrong Answer" && (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400">
                    <XCircle size={18} />
                    Wrong Answer
                  </span>
                )}

                {item.status === "Runtime Error" && (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400">
                    <AlertTriangle size={18} />
                    Runtime Error
                  </span>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}