import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import { problems } from "../data/problems";
import WorkspaceSidebar from "../components/layout/WorkspaceSidebar";

import DashboardPanel from "../components/workspace/DashboardPanel";
import ProblemsPanel from "../components/workspace/ProblemsPanel";
import AIMentorPanel from "../components/workspace/AIMentorPanel";
import HistoryPanel from "../components/workspace/HistoryPanel";
import SettingsPanel from "../components/workspace/SettingsPanel";

export default function CodingWorkspace() {

  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);

  return (
    <div className="min-h-screen text-white relative z-10">
      <Navbar />

      <div className="pt-28 px-8 pb-8">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h1 className="text-4xl font-bold">Coding Workspace</h1>

            <p className="text-gray-400 mt-2">
              Write code, submit solutions and get AI-powered feedback.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">

            <div className="col-span-2">
              <WorkspaceSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            <div className="col-span-10">

              {activeTab === "dashboard" && (
                <DashboardPanel problem={selectedProblem} />
              )}

              {activeTab === "problems" && (
                <ProblemsPanel
                  setActiveTab={setActiveTab}
                  setSelectedProblem={setSelectedProblem}
                />
              )}

              {activeTab === "mentor" && <AIMentorPanel />}
              {activeTab === "history" && <HistoryPanel />}
              {activeTab === "settings" && <SettingsPanel />}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}