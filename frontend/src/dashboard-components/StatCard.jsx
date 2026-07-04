import { motion } from "framer-motion";

const StatCard = ({ title, value, subtitle, icon }) => {
    return (
        <motion.div
            whileHover={{
                y: -5,
                scale: 1.02,
            }}
            transition={{
                duration: 0.2,
            }}
            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-cyan-400/10
                bg-[#101827]
                p-6
                shadow-[0_0_25px_rgba(34,211,238,0.05)]
            "
        >

            {/* Glow */}

            <div
                className="
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-cyan-400/10
                    blur-3xl
                    opacity-0
                    transition
                    duration-500
                    group-hover:opacity-100
                "
            />

            <div className="relative">

                <div className="flex items-center justify-between">

                    <p className="text-sm text-gray-400">
                        {title}
                    </p>

                    <div className="text-cyan-400 text-2xl">
                        {icon}
                    </div>

                </div>

                <h2 className="mt-5 text-4xl font-bold text-white">
                    {value}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    {subtitle}
                </p>

            </div>

        </motion.div>
    );
};

export default StatCard;