import { BrainCircuit, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"

const topics = [
    {
        name: "Arrays",
        color: "bg-green-400",
        top: "18%",
        left: "18%",
    },
    {
        name: "Graphs",
        color: "bg-yellow-400",
        top: "45%",
        left: "42%",
    },
    {
        name: "DP",
        color: "bg-red-400",
        top: "72%",
        left: "60%",
    },
    {
        name: "Strings",
        color: "bg-green-400",
        top: "28%",
        left: "76%",
    },
];

const BrainGraphPreview = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="
                rounded-3xl
                border
                border-cyan-400/10
                bg-[#101827]
                p-6
                shadow-[0_0_25px_rgba(34,211,238,0.06)]
            "
        >
            <div className="flex items-center gap-2">

                <BrainCircuit className="text-cyan-400" />

                <h2 className="text-xl font-semibold text-white">

                    Brain Graph

                </h2>

            </div>

            <p className="mt-2 text-sm text-gray-400">

                Visualize your mastery across coding topics.

            </p>

            <div
                className="
                    relative
                    mt-8
                    h-64
                    rounded-2xl
                    border
                    border-white/5
                    bg-[#0C1322]
                "
            >

                {topics.map((topic) => (

                    <motion.div
                        key={topic.name}
                        animate={{
                            scale: [1, 1.08, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                        }}
                        style={{
                            top: topic.top,
                            left: topic.left,
                        }}
                        className="
                            absolute
                            flex
                            flex-col
                            items-center
                            -translate-x-1/2
                            -translate-y-1/2
                        "
                    >

                        <div
                            className={`
                                ${topic.color}
                                h-5
                                w-5
                                rounded-full
                                shadow-lg
                            `}
                        />

                        <span className="mt-2 text-xs text-gray-300">

                            {topic.name}

                        </span>

                    </motion.div>

                ))}

            </div>

            <button
                className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-cyan-400
                    hover:text-cyan-300
                "
                onClick={() => navigate("/brain-graph")}
            >

                View Full Graph

                <ArrowRight size={18} />

            </button>

        </motion.div>
    );
};

export default BrainGraphPreview;