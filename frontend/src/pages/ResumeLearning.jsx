import {
    ArrowRight,
    BookOpen,
    Brain,
    Flame,
    Target,
    CheckCircle2,
    TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResumeLearning = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#070B14] text-white px-6 lg:px-10 py-10">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Hero */}

                <div className="rounded-3xl bg-[#111827] border border-cyan-500/10 p-8 flex flex-col lg:flex-row justify-between gap-8">

                    <div>

                        <p className="text-cyan-400 flex items-center gap-2 font-medium">
                            <Brain size={18} />
                            Continue Learning
                        </p>

                        <h1 className="text-5xl font-bold mt-4">
                            Welcome Back 👋
                        </h1>

                        <p className="text-gray-400 mt-4 text-lg max-w-xl leading-8">
                            Continue your coding journey from where you left off.
                            AI has prepared today's roadmap just for you.
                        </p>

                    </div>

                    <button
                        className="h-fit self-start lg:self-center bg-cyan-400 text-black px-8 py-4 rounded-2xl font-semibold hover:bg-cyan-300 transition flex items-center gap-3" onClick={() => navigate("/workspace")}
                    >
                        Resume Problem
                        <ArrowRight />
                    </button>

                </div>

                {/* Stats */}

                <div className="grid lg:grid-cols-4 gap-6">

                    <Card
                        title="Today's Goal"
                        value="2 / 4"
                        subtitle="Problems Completed"
                        icon={<Target className="text-cyan-400" />}
                    />

                    <Card
                        title="Current Streak"
                        value="14 Days"
                        subtitle="Keep Going!"
                        icon={<Flame className="text-orange-400" />}
                    />

                    <Card
                        title="Mastery"
                        value="82%"
                        subtitle="Overall Progress"
                        icon={<TrendingUp className="text-green-400" />}
                    />

                    <Card
                        title="Problems Solved"
                        value="128"
                        subtitle="Total"
                        icon={<CheckCircle2 className="text-cyan-400" />}
                    />

                </div>

                {/* Main Grid */}

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left */}

                    <div className="lg:col-span-2 space-y-8">

                        {/* Continue */}

                        <div className="rounded-3xl bg-[#111827] border border-white/5 p-7">

                            <h2 className="text-2xl font-semibold mb-6">
                                Continue Current Topic
                            </h2>

                            <div className="flex justify-between items-center flex-wrap gap-6">

                                <div>

                                    <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">
                                        Arrays
                                    </span>

                                    <h3 className="text-4xl font-bold mt-5">
                                        Two Sum
                                    </h3>

                                    <p className="text-gray-400 mt-3">
                                        89% completed • Easy
                                    </p>

                                </div>

                                <button className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-cyan-300 transition" onClick={() => navigate("/workspace")}>
                                    Resume →
                                </button>

                            </div>

                            <div className="mt-8 h-3 rounded-full bg-gray-700 overflow-hidden">

                                <div
                                    className="h-full bg-cyan-400 rounded-full"
                                    style={{ width: "89%" }}
                                />

                            </div>

                        </div>

                        {/* Recommended */}

                        <div className="rounded-3xl bg-[#111827] border border-white/5 p-7">

                            <h2 className="text-2xl font-semibold mb-6">
                                AI Recommended Topics
                            </h2>

                            <div className="grid md:grid-cols-2 gap-5">

                                <TopicCard
                                    topic="HashMap"
                                    desc="Frequently used in interviews."
                                />

                                <TopicCard
                                    topic="Sliding Window"
                                    desc="Improve array optimization."
                                />

                                <TopicCard
                                    topic="Binary Search"
                                    desc="High interview frequency."
                                />

                                <TopicCard
                                    topic="Graphs"
                                    desc="Your weakest topic."
                                />

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="space-y-8">

                        {/* Learning Path */}

                        <div className="rounded-3xl bg-[#111827] border border-white/5 p-7">

                            <h2 className="text-2xl font-semibold mb-6">
                                Learning Path
                            </h2>

                            <div className="space-y-4">

                                <Step completed text="Arrays" />

                                <Step completed text="Strings" />

                                <Step completed text="Hashing" />

                                <Step active text="Graphs" />

                                <Step text="Dynamic Programming" />

                                <Step text="Trees" />

                            </div>

                        </div>

                        {/* Recent */}

                        <div className="rounded-3xl bg-[#111827] border border-white/5 p-7">

                            <h2 className="text-2xl font-semibold mb-6">
                                Recent Activity
                            </h2>

                            <Activity
                                title="Two Sum"
                                time="2 hours ago"
                            />

                            <Activity
                                title="Contains Duplicate"
                                time="Yesterday"
                            />

                            <Activity
                                title="Binary Search"
                                time="2 days ago"
                            />

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

function Card({ title, value, subtitle, icon }) {
    return (
        <div className="rounded-3xl bg-[#111827] border border-white/5 p-6">

            <div className="flex justify-between">

                <div>

                    <p className="text-gray-400">
                        {title}
                    </p>

                    <h3 className="text-3xl font-bold mt-3">
                        {value}
                    </h3>

                    <p className="text-gray-500 mt-2">
                        {subtitle}
                    </p>

                </div>

                {icon}

            </div>

        </div>
    );
}

function TopicCard({ topic, desc }) {
    return (
        <div className="rounded-2xl bg-[#0F172A] border border-cyan-500/10 p-5 hover:border-cyan-400 transition">

            <BookOpen className="text-cyan-400 mb-4" />

            <h3 className="font-semibold text-xl">
                {topic}
            </h3>

            <p className="text-gray-400 mt-3">
                {desc}
            </p>

        </div>
    );
}

function Step({ completed, active, text }) {
    return (
        <div className="flex items-center gap-4">

            <div
                className={`w-4 h-4 rounded-full ${completed
                    ? "bg-green-400"
                    : active
                        ? "bg-cyan-400"
                        : "bg-gray-600"
                    }`}
            />

            <p
                className={`${active ? "text-cyan-400 font-semibold" : "text-gray-300"
                    }`}
            >
                {text}
            </p>

        </div>
    );
}

function Activity({ title, time }) {
    return (
        <div className="py-4 border-b border-white/5 last:border-none">

            <h3 className="font-medium">
                {title}
            </h3>

            <p className="text-gray-500 text-sm mt-1">
                {time}
            </p>

        </div>
    );
}

export default ResumeLearning;