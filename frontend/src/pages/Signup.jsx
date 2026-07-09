import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../lib/firebase/auth";
import { createUserDocument } from "../lib/firebase/firestore";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSignup = async () => {

        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email";
        }

        if (formData.password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        try {

            const user = await signup(
                formData.fullName,
                formData.email,
                formData.password
            );

            await createUserDocument(user);

            navigate("/login");
        }
        catch (error) {

            setErrors({
                firebase: error.message,
            });

        }
    };
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6">

            {/* Background Glow */}

            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/20 blur-[140px]" />

            {/* Signup Card */}

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >

                <div className="text-center">

                    <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-4xl font-bold text-transparent">
                        Create Account
                    </h1>

                    <p className="mt-3 text-gray-400">
                        Join AI Coding Mentor and start your coding journey.
                    </p>

                </div>

                <form className="mt-10 space-y-6">

                    {/* Name */}

                    <div>

                        <label className="mb-2 block text-sm text-gray-300">
                            Full Name
                        </label>

                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full rounded-xl border border-cyan-500/20 bg-[#07111f] px-4 py-3 text-white outline-none transition focus:border-cyan-400"

                        />
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.fullName}
                            </p>
                        )}


                    </div>

                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm text-gray-300">
                            Email
                        </label>

                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-cyan-500/20 bg-[#07111f] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.email}
                            </p>
                        )}

                    </div>

                    {/* Password */}

                    <div>

                        <label className="mb-2 block text-sm text-gray-300">
                            Password
                        </label>

                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Create a password"
                            className="w-full rounded-xl border border-cyan-500/20 bg-[#07111f] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.password}
                            </p>
                        )}

                    </div>

                    {/* Confirm Password */}

                    <div>

                        <label className="mb-2 block text-sm text-gray-300">
                            Confirm Password
                        </label>

                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full rounded-xl border border-cyan-500/20 bg-[#07111f] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.confirmPassword}
                            </p>
                        )}

                    </div>

                    <button

                        type="button"
                        onClick={handleSignup}
                        className="w-full rounded-xl bg-cyan-400 py-3 font-semibold text-[#020617] transition hover:bg-cyan-300"
                    >
                        Create Account
                    </button>
                    {errors.firebase && (
                        <p className="text-red-400 text-sm mt-2">
                            {errors.firebase}
                        </p>
                    )}

                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        Sign In
                    </Link>
                </p>

            </motion.div>

        </div>
    );
};

export default Signup;