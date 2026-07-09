import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { auth } from "../lib/firebase/firebase";

const WelcomeBanner = () => {
    const navigate = useNavigate()
    const name = auth.currentUser?.displayName || "Coder";
    return (
        <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-cyan-400/10
                bg-[#101827]
                px-8
                py-8
                shadow-[0_0_35px_rgba(34,211,238,0.08)]
            "
        >

            {/* Glow */}

            <div
                className="
                    absolute
                    -right-20
                    -top-20
                    h-60
                    w-60
                    rounded-full
                    bg-cyan-400/10
                    blur-[120px]
                "
            />

            <div
                className="
                    relative
                    flex
                    flex-col
                    gap-8
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Left */}

                <div>

                    <div className="flex items-center gap-2">

                        <HiSparkles className="text-cyan-400 text-xl" />

                        <span className="text-sm text-cyan-300">
                            Welcome Back
                        </span>

                    </div>

                    <h1
                        className="
                            mt-3
                            text-4xl
                            font-bold
                            leading-tight
                            text-white
                        "
                    >
                        Good Evening,
                        <span className="text-cyan-400">
                            {" "}{name} 👋
                        </span>
                    </h1>

                    <p
                        className="
                            mt-4
                            max-w-2xl
                            text-gray-400
                            leading-7
                        "
                    >
                        Continue mastering Data Structures,
                        Algorithms and ace your next coding interview.
                    </p>

                    <p className="mt-6 text-sm text-gray-500">
                        Last active • 2 hours ago
                    </p>

                </div>

                {/* Right */}

                <motion.button
                    whileHover={{
                        scale: 1.04,
                    }}
                    whileTap={{
                        scale: 0.97,
                    }}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-cyan-400
                        px-6
                        py-4
                        font-semibold
                        text-black
                        transition
                        hover:bg-cyan-300
                    "
                    onClick={() => navigate("/resume-learning")}
                >

                    Resume Learning

                    <ArrowRight size={18} />

                </motion.button>

            </div>

        </motion.section>
    );
};

export default WelcomeBanner;