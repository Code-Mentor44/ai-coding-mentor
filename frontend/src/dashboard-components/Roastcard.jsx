import { Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const RoastCard = () => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-red-400/10
                bg-[#101827]
                p-6
                shadow-[0_0_25px_rgba(248,113,113,0.06)]
            "
        >
            {/* Glow */}

            <div
                className="
                    absolute
                    -top-16
                    -right-16
                    h-40
                    w-40
                    rounded-full
                    bg-red-500/10
                    blur-[90px]
                "
            />

            <div className="relative">

                <div className="flex items-center gap-2">

                    <Flame className="text-red-400" />

                    <h2 className="text-xl font-semibold text-white">

                        Today's Roast

                    </h2>

                </div>

                <p
                    className="
                        mt-6
                        text-gray-300
                        leading-8
                    "
                >
                    "Congratulations.
                    Your algorithm works.

                    Unfortunately,
                    it also takes a coffee break
                    before finishing."
                </p>

                <div
                    className="
                        mt-8
                        rounded-2xl
                        border
                        border-white/5
                        bg-[#0C1322]
                        p-4
                    "
                >

                    <div className="flex justify-between">

                        <span className="text-gray-400">

                            Your Complexity

                        </span>

                        <span className="text-red-300 font-medium">

                            O(n²)

                        </span>

                    </div>

                    <div className="mt-3 flex justify-between">

                        <span className="text-gray-400">

                            Expected

                        </span>

                        <span className="text-green-300 font-medium">

                            O(n)

                        </span>

                    </div>

                </div>

                <button
                    className="
                        mt-6
                        flex
                        items-center
                        gap-2
                        text-red-400
                        hover:text-red-300
                    "
                >

                    View Analysis

                    <ArrowRight size={18} />

                </button>

            </div>

        </motion.div>
    );
};

export default RoastCard;