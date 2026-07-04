import { Handle, Position } from "reactflow";

const getColor = (mastery) => {
    if (mastery >= 80)
        return {
            border: "border-emerald-400",
            glow: "shadow-[0_0_35px_rgba(16,185,129,.5)]",
            text: "text-emerald-300",
        };

    if (mastery >= 50)
        return {
            border: "border-yellow-400",
            glow: "shadow-[0_0_35px_rgba(250,204,21,.5)]",
            text: "text-yellow-300",
        };

    return {
        border: "border-red-400",
        glow: "shadow-[0_0_35px_rgba(248,113,113,.5)]",
        text: "text-red-300",
    };
};

export default function CustomNode({ data }) {
    const color = getColor(data.mastery);

    return (
        <>
            <Handle type="target" position={Position.Top} />

            <div
                className={`
        w-44
        rounded-3xl
        border
        ${color.border}
        ${color.glow}
        bg-[#101827]/90
        backdrop-blur-xl
        px-5
        py-4
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-cyan-500/30
      `}
            >
                <h3 className="text-white text-center font-semibold">
                    {data.label}
                </h3>

                <p className={`text-center mt-2 text-2xl font-bold ${color.text}`}>
                    {data.mastery}%
                </p>

                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{
                            width: `${data.mastery}%`,
                        }}
                    />
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </>
    );
}