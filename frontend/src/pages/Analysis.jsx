import {
    Brain,
    Clock3,
    Code2,
    Sparkles,
    TriangleAlert,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#070B14] text-white px-8 py-10">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}

                <div className="mb-10">
                    <p className="text-cyan-400 text-sm font-medium">
                        AI Analysis
                    </p>

                    <h1 className="text-5xl font-bold mt-2">
                        Two Sum
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Here's how your solution performed.
                    </p>
                </div>

                {/* Score */}

                <div className="rounded-3xl border border-cyan-500/10 bg-[#111827] p-8 mb-8">

                    <div className="flex justify-between items-center flex-wrap gap-8">

                        <div>
                            <p className="text-gray-400">Overall Score</p>

                            <h2 className="text-6xl font-bold text-cyan-400 mt-2">
                                84%
                            </h2>
                        </div>

                        <div className="flex gap-6">

                            <div>
                                <p className="text-gray-400 text-sm">
                                    Time
                                </p>

                                <h3 className="text-red-400 text-2xl font-semibold">
                                    O(n²)
                                </h3>
                            </div>

                            <div>
                                <p className="text-gray-400 text-sm">
                                    Expected
                                </p>

                                <h3 className="text-green-400 text-2xl font-semibold">
                                    O(n)
                                </h3>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Grid */}

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* Left */}

                    <div className="space-y-8">

                        {/* AI Explanation */}

                        <div className="rounded-3xl bg-[#111827] border border-white/5 p-7">

                            <div className="flex items-center gap-3 mb-5">

                                <Brain className="text-cyan-400" />

                                <h2 className="text-2xl font-semibold">
                                    AI Explanation
                                </h2>

                            </div>

                            <p className="text-gray-300 leading-8">
                                Your solution correctly solves the problem.
                                However, it uses nested loops which increases
                                the time complexity to <span className="text-red-400 font-semibold">O(n²)</span>.
                                A HashMap based approach can solve the same
                                problem in <span className="text-green-400 font-semibold">O(n)</span>.
                            </p>

                        </div>

                        {/* Suggestions */}

                        <div className="rounded-3xl bg-[#111827] border border-white/5 p-7">

                            <div className="flex items-center gap-3 mb-5">

                                <Sparkles className="text-cyan-400" />

                                <h2 className="text-2xl font-semibold">
                                    Suggestions
                                </h2>

                            </div>

                            <div className="space-y-4">

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-400" />
                                    Use HashMap instead of nested loops.
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-400" />
                                    Reduce repeated traversal.
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-400" />
                                    Improve variable naming.
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="space-y-8">

                        {/* Strength */}

                        <div className="rounded-3xl bg-[#111827] border border-green-500/10 p-7">

                            <h2 className="text-2xl font-semibold mb-5">
                                Strengths
                            </h2>

                            <div className="space-y-4">

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-400" />
                                    Correct logic
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-400" />
                                    Handles edge cases
                                </div>

                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-400" />
                                    Clean formatting
                                </div>

                            </div>

                        </div>

                        {/* Weakness */}

                        <div className="rounded-3xl bg-[#111827] border border-red-500/10 p-7">

                            <h2 className="text-2xl font-semibold mb-5">
                                Weaknesses
                            </h2>

                            <div className="space-y-4">

                                <div className="flex items-center gap-3">
                                    <TriangleAlert className="text-red-400" />
                                    Nested loops
                                </div>

                                <div className="flex items-center gap-3">
                                    <TriangleAlert className="text-red-400" />
                                    High time complexity
                                </div>

                                <div className="flex items-center gap-3">
                                    <TriangleAlert className="text-red-400" />
                                    Unnecessary traversal
                                </div>

                            </div>

                        </div>

                        {/* Roast */}

                        <div className="rounded-3xl bg-gradient-to-br from-[#111827] to-[#1B1A2F] border border-red-500/10 p-7">

                            <h2 className="text-2xl font-semibold text-red-400 mb-5">
                                🔥 Roast Mode
                            </h2>

                            <p className="text-gray-300 leading-8">
                                Congratulations. Your solution works.
                                Unfortunately, it also gives every element
                                enough time to introduce itself before finding
                                the answer.
                            </p>

                        </div>

                    </div>

                </div>

                {/* Bottom */}

                <div className="mt-10 flex flex-wrap gap-5">

                    <button className="px-7 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-black" onClick={() => navigate("/workspace")}>
                        Solve Again
                    </button>

                    <button className="px-7 py-3 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/10 transition flex items-center gap-2" onClick={() => navigate("/brain-graph")}>
                        View Brain Graph
                        <ArrowRight size={18} />
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Analysis;