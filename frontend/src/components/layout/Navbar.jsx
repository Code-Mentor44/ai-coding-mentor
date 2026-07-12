import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiBell,
  FiSettings,
  FiUser,
  FiX,
} from "react-icons/fi";

export default function Navbar({
  activeTab,
  setActiveTab,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const pageTitles = {
    dashboard: "Dashboard",
    problems: "Problems",
    mentor: "AI Mentor",
    history: "History",
    settings: "Settings",
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-cyan-500/30">
            AI
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Coding Mentor
            </h1>

            <p className="text-xs text-gray-400">
              AI Powered Workspace
            </p>
          </div>

        </div>

        {/* Dynamic Title */}

        <div className="hidden md:block">
          <h2 className="text-lg font-semibold text-cyan-400">
            {pageTitles[activeTab]}
          </h2>
        </div>

        {/* Right Section */}

        <div className="relative flex items-center gap-4">

          {/* Notifications */}

          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 transition flex items-center justify-center"
          >
            <FiBell size={18} />
          </button>

          {/* Settings */}

          <button
            onClick={() => {
              setActiveTab("settings");
              setShowNotifications(false);
              setShowProfile(false);
            }}
            className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 transition flex items-center justify-center"
          >
            <FiSettings size={18} />
          </button>

          {/* Profile */}

          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center text-black font-bold shadow-lg shadow-cyan-500/30"
          >
            <FiUser size={18} />
          </button>

          {/* Notifications Dropdown */}

          {showNotifications && (
            <div className="absolute top-16 right-20 w-80 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">

              <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">

                <h3 className="font-semibold">
                  Notifications
                </h3>

                <button
                  onClick={() => setShowNotifications(false)}
                >
                  <FiX />
                </button>

              </div>

              <div className="divide-y divide-white/10">

                <div className="p-4 hover:bg-white/5">
                  ✅ Welcome back! Ready to code?
                </div>

                <div className="p-4 hover:bg-white/5">
                  🚀 New Daily Challenge available.
                </div>

                <div className="p-4 hover:bg-white/5">
                  🤖 AI Mentor is ready to help.
                </div>

                <div className="p-4 hover:bg-white/5">
                  🎯 Keep your coding streak alive.
                </div>

              </div>

            </div>
          )}

          {/* Profile Dropdown */}

          {showProfile && (
            <div className="absolute top-16 right-0 w-60 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">

              <div className="p-5 border-b border-white/10">

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center text-black font-bold mx-auto">
                  <FiUser size={22} />
                </div>

                <h3 className="text-center mt-3 font-semibold">
                  My Workspace
                </h3>

              </div>

              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  setShowProfile(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-cyan-500/10 transition"
              >
                🏠 Dashboard
              </button>

              <button
                onClick={() => {
                  setActiveTab("history");
                  setShowProfile(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-cyan-500/10 transition"
              >
                📜 History
              </button>

              <button
                onClick={() => {
                  setActiveTab("settings");
                  setShowProfile(false);
                }}
                className="w-full text-left px-5 py-3 hover:bg-cyan-500/10 transition"
              >
                ⚙ Settings
              </button>

              <button
                onClick={() => {
                  setShowProfile(false);
                  alert("Logout feature coming soon!");
                }}
                className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-500/10 transition"
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </motion.nav>
  );
}