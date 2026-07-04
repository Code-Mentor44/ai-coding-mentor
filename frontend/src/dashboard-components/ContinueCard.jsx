import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

const ContinueCard = () => {
    return (
        <motion.section
            whileHover={{ scale: 1.01 }}
            className="
                relative
                overflow-hidden
                mt-10
                rounded-3xl
                border
                border-cyan-400/10
                bg-[#101827]
                p-8
                shadow-[0_0_25px_rgba(34,211,238,0.06)]
            "
        >

            {/* Glow */}

            <div
                className="
                    absolute
                    right-0
                    top-0
                    h-48
                    w-48
                    rounded-full
                    bg-cyan-400/10
                    blur-[120px]
                "
            />

            <div className="relative flex flex-col lg:flex-row justify-between gap-8">

                {/* Left */}

                <div>

                    <div className="flex items-center gap-2 text-cyan-400">

                        <BookOpen size={18} />

                        <span className="text-sm font-medium">
                            Continue Learning
                        </span>

                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-white">

                        Two Sum

                    </h2>

                    <p className="mt-3 text-gray-400 max-w-lg">

                        Resume solving your last coding problem
                        and continue improving your interview skills.

                    </p>

                    <div className="mt-6 flex gap-3">

                        <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 text-cyan-300 text-sm">

                            Arrays

                        </span>

                        <span className="rounded-full bg-green-500/10 border border-green-500/20 px-4 py-2 text-green-300 text-sm">

                            Easy

                        </span>

                    </div>

                </div>

                {/* Right */}

                <div className="flex flex-col justify-between">

                    <button
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-cyan-400
                            px-6
                            py-4
                            font-semibold
                            text-black
                            hover:bg-cyan-300
                            transition
                        "
                    >

                        Resume

                        <ArrowRight size={18} />

                    </button>

                    <div className="mt-8 flex gap-8">

                        <div>

                            <p className="text-gray-500 text-sm">

                                Remaining

                            </p>

                            <h3 className="text-2xl font-bold text-white">

                                42

                            </h3>

                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">

                                Success Rate

                            </p>

                            <h3 className="text-2xl font-bold text-white">

                                89%

                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </motion.section>
    );
};

export default ContinueCard;