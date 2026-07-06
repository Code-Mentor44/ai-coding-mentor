import { problems } from "../../data/problems";
export default function ProblemsPanel({
    setActiveTab,
    setSelectedProblem,
}) {


    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h1 className="text-3xl font-bold mb-6">Problems</h1>

            <div className="space-y-4">
                {problems.map((problem) => (
                    <div
                        key={problem.id}
                        className="border border-white/10 rounded-xl p-5 hover:border-cyan-400 hover:bg-white/5 transition cursor-pointer"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-semibold">{problem.title}</h2>

                                    {problem.solved && (
                                        <span className="text-green-400 text-sm">
                                            ✔ Solved
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-400 mt-1">{problem.topic}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span
                                    className={`px-3 py-1 rounded-lg ${problem.difficulty === "Easy"
                                        ? "bg-green-500/20 text-green-400"
                                        : problem.difficulty === "Medium"
                                            ? "bg-yellow-500/20 text-yellow-400"
                                            : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {problem.difficulty}
                                </span>

                                <button
                                    onClick={() => {
                                        setSelectedProblem(problem);
                                        setActiveTab("dashboard");
                                    }}
                                    className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold"
                                >
                                    Solve
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}