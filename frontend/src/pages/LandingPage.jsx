import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCode,
  FiCpu,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-violet-500/20 rounded-full blur-[140px]" />

      {/* Navbar */}

      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-[#020617]/70 border-b border-white/5">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex justify-between items-center">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">

              <FiCpu size={20} />

            </div>

            <div>

              <h1 className="font-semibold text-lg tracking-tight">

                AI Coding Mentor

              </h1>

              <p className="text-[11px] text-cyan-300/80 tracking-wide">

                Smart Coding Platform

              </p>

            </div>

          </div>

          {/* Desktop Menu */}

          <nav className="hidden md:flex items-center gap-8 text-[15px]">

            <a href="#features" className="hover:text-cyan-400 transition">
              Features
            </a>

            <a href="#stats" className="hover:text-cyan-400 transition">
              Statistics
            </a>

            <a href="#about" className="hover:text-cyan-400 transition">
              About
            </a>

            <Link
              to="/login"
              className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Get Started
            </Link>

          </nav>

          {/* Mobile Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (

          <div className="md:hidden border-t border-white/10 bg-slate-900/95">

            <div className="flex flex-col p-6 gap-5">

              <a href="#features">Features</a>

              <a href="#stats">Statistics</a>

              <a href="#about">About</a>

              <Link
                to="/login"
                className="bg-cyan-400 text-center text-black py-3 rounded-xl font-semibold"
              >
                Get Started
              </Link>

            </div>

          </div>

        )}

      </header>

      {/* Hero */}

      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300">

              🚀 AI Powered Coding Platform

            </span>

            <h1 className="mt-6 text-4xl lg:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-[-0.03em]">

              Learn.

              <br />

              Practice.

              <br />

              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">

                Crack Every Interview.

              </span>

            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">

              AI Coding Mentor combines coding practice,
              competitive programming,
              placement preparation,
              AI feedback,
              and exam mode into one modern learning platform.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-cyan-500/30"
              >

                Start Coding

                <FiArrowRight />

              </Link>

              <button className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/5">
                <a href="#features" className="hover:text-cyan-400 transition">
                  Explore Features
                </a>
              </button>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            className="relative"
          >

            <div className="rounded-[28px] border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10">

              <div className="rounded-2xl border border-cyan-500/10 bg-[#07111f] p-5">

                <div className="flex items-center gap-3 mb-6">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500">

                    <FiCode size={18} />

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">

                      AI Coding Workspace

                    </h3>

                    <p className="text-sm text-gray-400">

                      Monaco Editor + AI Mentor

                    </p>

                  </div>

                </div>

                <div className="space-y-4">

                  <div className="h-4 bg-cyan-400/40 rounded-full w-2/3"></div>
                  <div className="h-4 bg-white/10 rounded-full"></div>
                  <div className="h-4 bg-white/10 rounded-full w-5/6"></div>
                  <div className="h-4 bg-cyan-400/30 rounded-full w-1/2"></div>
                  <div className="h-4 bg-white/10 rounded-full"></div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>
      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-semibold tracking-widest uppercase">
            Features
          </span>

          <h2 className="text-4xl lg:text-4xl lg:text-5xl font-bold mt-4">
            Everything You Need
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            A complete AI-powered platform for coding interviews,
            placement preparation, competitive programming and exams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {[
            {
              title: "AI Mentor",
              desc: "Get instant AI explanations and optimization suggestions.",
              color: "from-cyan-500 to-blue-600",
              icon: "🤖",
            },
            {
              title: "Practice Coding",
              desc: "Solve coding questions with Monaco Editor.",
              color: "from-violet-500 to-pink-500",
              icon: "💻",
            },
            {
              title: "Exam Mode",
              desc: "Distraction-free coding exams with autosave and timer.",
              color: "from-green-500 to-emerald-500",
              icon: "📝",
            },
            {
              title: "Performance",
              desc: "Track progress, rankings, streaks and AI reports.",
              color: "from-orange-500 to-red-500",
              icon: "📈",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * .15 }}
              whileHover={{ y: -10 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl`}
              >
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-400 leading-7">
                {feature.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= STATS ================= */}

      <section
        id="stats"
        className="max-w-7xl mx-auto px-6 pb-24"
      >
        <div className="rounded-[32px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-white/10 px-8 py-10 lg:px-12 lg:py-12">

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >

            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-cyan-400">
                10K+
              </h2>

              <p className="mt-3 text-gray-400">
                Students
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-violet-400">
                50K+
              </h2>

              <p className="mt-3 text-gray-400">
                Problems Solved
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-green-400">
                95%
              </h2>

              <p className="mt-3 text-gray-400">
                Accuracy
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-orange-400">
                24/7
              </h2>

              <p className="mt-3 text-gray-400">
                AI Support
              </p>
            </div>

          </motion.div>

        </div>
      </section>

      {/* ================= WHY AI ================= */}

      <section
        id="about"
        className="max-w-7xl mx-auto px-6 pb-24"
      >

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <span className="text-cyan-400 uppercase tracking-widest font-semibold">
              Why AI Coding Mentor?
            </span>

            <h2 className="text-5xl font-bold mt-5 leading-tight">

              Practice Smarter.

              <br />

              Learn Faster.

            </h2>

            <p className="mt-8 text-gray-400 leading-8">

              Instead of simply telling whether your answer is correct,
              our AI explains your mistakes, analyzes complexity,
              recommends improvements and helps you become interview-ready.

            </p>

            <div className="space-y-5 mt-10">

              {[
                "✅ AI Code Review",
                "✅ Competitive Programming",
                "✅ Placement Preparation",
                "✅ Exam Environment",
                "✅ Progress Analytics",
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/5 border border-white/10 p-4"
                >
                  {item}
                </div>
              ))}

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[35px] bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10 p-10"
          >

            <div className="space-y-6">

              <div className="rounded-2xl bg-[#08111f] p-6 border border-cyan-500/20">
                <h3 className="font-bold text-xl">
                  AI Feedback
                </h3>

                <p className="text-gray-400 mt-3">
                  Excellent solution! Time Complexity O(n).
                  Consider improving variable names.
                </p>
              </div>

              <div className="rounded-2xl bg-[#08111f] p-6 border border-violet-500/20">
                <h3 className="font-bold text-xl">
                  Progress
                </h3>

                <div className="w-full h-4 rounded-full bg-white/10 mt-4">

                  <div className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 w-4/5"></div>

                </div>

                <p className="mt-4 text-cyan-300">
                  82% Complete
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </section>
      {/* ================= TESTIMONIALS ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="text-cyan-400 uppercase tracking-widest font-semibold">
            Testimonials
          </span>

          <h2 className="text-5xl font-bold mt-5">
            Loved by Students
          </h2>

          <p className="text-gray-400 mt-5">
            Hear what our learners say about AI Coding Mentor.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-14">

          {[
            {
              name: "Aarav Sharma",
              role: "Software Engineering Student",
              review:
                "The AI feedback helped me understand my mistakes instantly. It feels like having a personal mentor.",
            },
            {
              name: "Priya Patel",
              role: "Placement Aspirant",
              review:
                "Exam Mode is amazing! I practiced under real interview conditions and gained confidence.",
            },
            {
              name: "Rahul Verma",
              role: "Competitive Programmer",
              review:
                "A beautiful interface with everything needed for coding practice in one place.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div className="text-yellow-400 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="mt-6 text-gray-300 leading-8">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-28">

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[40px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 p-[2px]"
        >

          <div className="rounded-[38px] bg-[#020617] px-10 py-20 text-center">

            <h2 className="text-5xl lg:text-6xl font-bold">

              Ready to Become

              <br />

              a Better Programmer?

            </h2>

            <p className="mt-8 text-gray-400 text-lg max-w-3xl mx-auto leading-8">

              Start practicing coding problems, receive AI-powered feedback,
              improve your problem-solving skills, and ace every coding interview.

            </p>

            <Link
              to="/login"
              className="inline-flex items-center gap-3 mt-10 px-10 py-5 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-cyan-500/30"
            >

              Launch Dashboard

              <FiArrowRight />

            </Link>

          </div>

        </motion.div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <h2 className="text-2xl font-bold">

              AI Coding Mentor

            </h2>

            <p className="text-gray-500 mt-2">

              Learn • Practice • Improve

            </p>

          </div>

          <div className="flex gap-8 text-gray-400">

            <a href="#features" className="hover:text-cyan-400 transition">
              Features
            </a>

            <a href="#stats" className="hover:text-cyan-400 transition">
              Statistics
            </a>

            <a href="#about" className="hover:text-cyan-400 transition">
              About
            </a>

          </div>

          <p className="text-gray-500 text-sm">

            © 2026 AI Coding Mentor • Built with React + Vite

          </p>

        </div>

      </footer>

    </div>
  );
}