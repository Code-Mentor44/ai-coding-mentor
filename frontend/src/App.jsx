import { BrowserRouter, Routes, Route } from "react-router-dom";

import AIBackground from "./components/layout/AIBackground";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CodingWorkspace from "./pages/CodingWorkspace";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrainGraphPage from "./pages/BrainGraphPage";

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden">
        <AIBackground />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brain-graph" element={<BrainGraphPage />} />
          <Route path="/workspace" element={<CodingWorkspace />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;