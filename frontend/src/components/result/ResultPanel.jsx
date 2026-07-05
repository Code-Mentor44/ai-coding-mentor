import {
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiAward,
  FiCode,
} from "react-icons/fi";
import { useEditor } from "../../context/EditorContext"; 

export default function ResultPanel() {
  const { result, loading } = useEditor();

  const getStatusConfig = () => {
    if (loading) {
      return {
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
        textColor: "text-cyan-400",
        label: "Running...",
        description: "Executing code on sandbox...",
      };
    }

    switch (result.status) {
      case "Accepted":
        return {
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30",
          textColor: "text-green-400",
          label: "Accepted",
          description: "All test cases passed successfully",
        };
      case "Syntax Error":
        return {
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          textColor: "text-red-400",
          label: "Syntax Error",
          description: "Code compilation failed",
        };
      case "Logic Error":
        return {
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/30",
          textColor: "text-orange-400",
          label: "Logic Error",
          description: "Incorrect program output",
        };
      case "Error":
        return {
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          textColor: "text-red-400",
          label: "Execution Error",
          description: result.error || "Execution failed",
        };
      default:
        return {
          bgColor: "bg-white/5",
          borderColor: "border-white/10",
          textColor: "text-gray-400",
          label: result.status || "Waiting",
          description: "Submit code to run test cases",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between">

      <div>
        <h2 className="text-3xl font-bold mb-6">
          Result
        </h2>

        <div className="space-y-5">

          {/* Status */}

          <div className={`rounded-2xl border p-4 transition-all duration-300 ${statusConfig.bgColor} ${statusConfig.borderColor}`}>

            <div className="flex items-center gap-3">

              <FiCheckCircle
                size={26}
                className={`transition-colors duration-300 ${statusConfig.textColor}`}
              />

              <div>

                <p className={`font-semibold transition-colors duration-300 ${statusConfig.textColor}`}>
                  {statusConfig.label}
                </p>

                <p className="text-sm text-gray-400">
                  {statusConfig.description}
                </p>

              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="space-y-4">

            <div className="flex justify-between">

              <div className="flex gap-2 items-center text-gray-300">

                <FiClock />

                <span>Execution</span>

              </div>

              <span className="text-cyan-400 font-mono">
                {loading ? "--" : result.execution}
              </span>

            </div>

            <div className="flex justify-between">

              <div className="flex gap-2 items-center text-gray-300">

                <FiDatabase />

                <span>Memory</span>

              </div>

              <span className="text-cyan-400 font-mono">
                {loading ? "--" : result.memory}
              </span>

            </div>

            <div className="flex justify-between">

              <div className="flex gap-2 items-center text-gray-300">

                <FiAward />

                <span>Score</span>

              </div>

              <span className="text-cyan-400 font-mono">
                {loading ? "--" : result.score === "--" ? "--" : `${result.score} Points`}
              </span>

            </div>

            <div className="flex justify-between">

              <div className="flex gap-2 items-center text-gray-300">

                <FiCode />

                <span>Language</span>

              </div>

              <span className="text-cyan-400">
                {result.language}
              </span>

            </div>

          </div>

          {/* Progress */}

          <div className="mt-8">

            <div className="flex justify-between text-sm mb-2">

              <span>Test Cases</span>

              <span>{loading ? "Calculating..." : (result.status === "Accepted" ? "15 / 15" : "0 / 15")}</span>

            </div>

            <div className="h-3 rounded-full bg-gray-700 overflow-hidden">

              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  loading ? "w-1/3" : (result.status === "Accepted" ? "w-full" : "w-0")
                } bg-gradient-to-r from-cyan-400 to-violet-500`}
              ></div>

            </div>

          </div>

        </div>
      </div>

      {/* Terminal Console Output */}
      <div className="mt-6 border-t border-white/10 pt-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
          <span>Terminal Console</span>
          {(result.error || result.stderr) && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
          {result.stdout && !result.stderr && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
        </h3>
        
        <div className="rounded-xl bg-black/40 border border-white/5 p-4 font-mono text-[11px] overflow-auto h-[180px] whitespace-pre-wrap flex flex-col justify-between leading-relaxed">
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <span className="text-cyan-400/70 animate-pulse">Running compilation and tests...</span>
            ) : result.error ? (
              <span className="text-red-400">{result.error}</span>
            ) : result.stderr ? (
              <span className="text-red-400">{result.stderr}</span>
            ) : result.stdout ? (
              <span className="text-emerald-400">{result.stdout}</span>
            ) : (
              <span className="text-gray-500/80">No execution data available. Click "Run" or "Submit" to execute code.</span>
            )}
          </div>
          
          {!loading && (result.stdout || result.stderr || result.error) && (
            <div className="mt-2 pt-2 border-t border-white/5 text-[9px] text-gray-500 flex justify-between font-sans">
              <span>Status: {result.status}</span>
              <span>Time: {result.execution}</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}