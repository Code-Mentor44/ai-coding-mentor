import { BrowserRouter, Routes, Route } from "react-router-dom";

import AIBackground from "./components/layout/AIBackground";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CodingWorkspace from "./pages/CodingWorkspace";

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden">
        <AIBackground />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace" element={<CodingWorkspace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;