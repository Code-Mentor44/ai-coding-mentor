import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6">

            {/* Background Glow */}

            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/20 blur-[140px]" />

            {/* Login Card */}

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >

                <div className="text-center">

                    <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-4xl font-bold text-transparent">
                        Welcome Back
                    </h1>

                    <p className="mt-3 text-gray-400">
                        Sign in to continue your coding journey.
                    </p>

                </div>

                <form className="mt-10 space-y-6">

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-cyan-500/20 bg-[#07111f] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full rounded-xl border border-cyan-500/20 bg-[#07111f] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">

                        <label className="flex items-center gap-2 text-gray-400">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <button
                            type="button"
                            className="text-cyan-400 hover:text-cyan-300"
                        >
                            Forgot Password?
                        </button>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="w-full rounded-xl bg-cyan-400 py-3 font-semibold text-[#020617] transition hover:bg-cyan-300"
                  >
                        Sign In
                    </button>

                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        Sign Up
                    </Link>
                </p>

            </motion.div>

        </div>
    );
};

export default Login;