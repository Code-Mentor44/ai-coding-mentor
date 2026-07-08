import { useState } from "react";
import {
  Settings,
  Moon,
  Save,
  Bell,
  WrapText,
  Type,
  Code2,
} from "lucide-react";

export default function SettingsPanel() {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoSave: true,
    wordWrap: true,
    notifications: true,
    theme: "Dark",
    language: "Java",
    fontSize: 16,
    tabSize: 4,
  });

  const toggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-6">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
            <Settings className="text-cyan-300" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Workspace Settings
            </h1>

            <p className="text-gray-400 mt-1">
              Personalize your coding experience.
            </p>
          </div>

        </div>

      </div>

      {/* Preferences */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Appearance */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <Moon size={20} />
            Appearance
          </h2>

          <div className="space-y-5">

            <div>
              <label className="text-gray-400 block mb-2">
                Editor Theme
              </label>

              <select
                value={settings.theme}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    theme: e.target.value,
                  })
                }
                className="w-full rounded-xl bg-[#111827] border border-white/10 p-3"
              >
                <option>Dark</option>
                <option>Light</option>
              </select>
            </div>

            <div className="flex justify-between items-center">

              <div>
                <h3 className="font-semibold">
                  Dark Mode
                </h3>

                <p className="text-sm text-gray-400">
                  Enable dark interface
                </p>

              </div>

              <button
                onClick={() => toggle("darkMode")}
                className={`w-14 h-7 rounded-full transition ${
                  settings.darkMode
                    ? "bg-cyan-500"
                    : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full mt-0.5 transition ${
                    settings.darkMode
                      ? "translate-x-7"
                      : "translate-x-0.5"
                  }`}
                />
              </button>

            </div>

          </div>

        </div>

        {/* Editor */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <Code2 size={20} />
            Editor
          </h2>

          <div className="space-y-5">

            <div>
              <label className="text-gray-400 block mb-2">
                Preferred Language
              </label>

              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    language: e.target.value,
                  })
                }
                className="w-full rounded-xl bg-[#111827] border border-white/10 p-3"
              >
                <option>Java</option>
                <option>C++</option>
                <option>Python</option>
                <option>JavaScript</option>
              </select>
            </div>

            <div>
              <label className="text-gray-400 block mb-2">
                Font Size
              </label>

              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    fontSize: e.target.value,
                  })
                }
                className="w-full"
              />

              <p className="text-sm text-cyan-400 mt-2">
                {settings.fontSize}px
              </p>

            </div>

            <div>
              <label className="text-gray-400 block mb-2">
                Tab Size
              </label>

              <select
                value={settings.tabSize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    tabSize: e.target.value,
                  })
                }
                className="w-full rounded-xl bg-[#111827] border border-white/10 p-3"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
              </select>
            </div>

          </div>

        </div>

      </div>

      {/* Toggles */}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

        <h2 className="text-xl font-semibold mb-5">
          Workspace Preferences
        </h2>

        <div className="space-y-5">

          {[
            {
              key: "autoSave",
              title: "Auto Save",
              desc: "Automatically save your code.",
              icon: <Save size={20} />,
            },
            {
              key: "wordWrap",
              title: "Word Wrap",
              desc: "Wrap long lines inside editor.",
              icon: <WrapText size={20} />,
            },
            {
              key: "notifications",
              title: "Notifications",
              desc: "Receive coding reminders.",
              icon: <Bell size={20} />,
            },
          ].map((item) => (

            <div
              key={item.key}
              className="flex items-center justify-between border-b border-white/10 pb-4"
            >

              <div className="flex items-center gap-4">

                <div className="text-cyan-400">
                  {item.icon}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {item.desc}
                  </p>

                </div>

              </div>

              <button
                onClick={() => toggle(item.key)}
                className={`w-14 h-7 rounded-full transition ${
                  settings[item.key]
                    ? "bg-cyan-500"
                    : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full mt-0.5 transition ${
                    settings[item.key]
                      ? "translate-x-7"
                      : "translate-x-0.5"
                  }`}
                />
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* Footer */}

      <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">

        <h2 className="text-xl font-semibold text-green-300">
          ✅ Settings Preview
        </h2>

        <p className="text-gray-300 mt-3 leading-7">
          These settings are currently stored only in the frontend for
          demonstration. Once the backend is connected, your preferences
          can be saved permanently for every login.
        </p>

      </div>

    </div>
  );
}