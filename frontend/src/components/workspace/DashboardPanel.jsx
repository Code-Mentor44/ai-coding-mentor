import CodeEditor from "../editor/CodeEditor";
import ResultPanel from "../result/ResultPanel";
import HintPanel from "../hint/HintPanel";

export default function DashboardPanel({ problem }) {
    return (
        <>
            {/* Challenge Card */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                                🔥 Daily Challenge
                            </span>

                            <h2 className="text-3xl font-bold mt-4">
                                {problem?.title || "Two Sum"}
                            </h2>
                        </div>

                        <div className="flex gap-3">
                            <span className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300">
                                {problem?.difficulty || "Easy"}
                            </span>
                            <span className="px-4 py-2 rounded-xl bg-violet-500/20 text-violet-300">
                                {problem?.topic || "Arrays"}
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-300 mt-6 leading-8 text-lg">
                        {problem?.description}

                    </p>

                    <div className="flex gap-6 mt-8">
                        <div className="rounded-xl bg-white/5 px-5 py-3 border border-white/10">
                            <p className="text-gray-400 text-sm">Acceptance</p>
                            <h3 className="text-cyan-400 text-xl font-bold">56.8%</h3>
                        </div>

                        <div className="rounded-xl bg-white/5 px-5 py-3 border border-white/10">
                            <p className="text-gray-400 text-sm">Submissions</p>
                            <h3 className="text-violet-400 text-xl font-bold">12.4M</h3>
                        </div>

                        <div className="rounded-xl bg-white/5 px-5 py-3 border border-white/10">
                            <p className="text-gray-400 text-sm">Points</p>
                            <h3 className="text-yellow-400 text-xl font-bold">+100</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Workspace */}
            <div className="grid grid-cols-12 gap-6 mt-6">
                <div className="col-span-8">
                    <div className="rounded-3xl border border-white/10 bg-white/5 min-h-[620px] p-6">
                        <h2 className="text-2xl font-bold mb-4">Code Editor</h2>
                        <CodeEditor problem={problem} />
                    </div>
                </div>

                <div className="col-span-4">
                    <ResultPanel />
                </div>
            </div>

            <div className="mt-6">
                <HintPanel />
            </div>
        </>
    );
}