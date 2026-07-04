import { useMemo } from "react";

import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    BackgroundVariant,
} from "reactflow";

import "reactflow/dist/style.css";

import {
    initialNodes,
    initialEdges,
    nodeTypes,
} from "./graphData";

export default function BrainGraph() {
    const memoizedNodeTypes = useMemo(() => nodeTypes, []);

    return (
        <div
            className="
      relative
      h-[75vh]
      w-full
      overflow-hidden
      rounded-3xl
      border
      border-cyan-400/10
      bg-[#07111d]
      shadow-[0_0_60px_rgba(6,182,212,.08)]
    "
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,.15),transparent_75%)]" />

            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={memoizedNodeTypes}
                fitView
                fitViewOptions={{
                    padding: 0.3,
                }}
                minZoom={0.5}
                maxZoom={2}
                proOptions={{
                    hideAttribution: true,
                }}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={24}
                    size={2}
                    color="#2563eb"
                />

                <MiniMap
                    zoomable
                    pannable
                    style={{
                        background: "#0f172a",
                        borderRadius: "12px",
                    }}
                />

                <Controls
                    position="bottom-left"
                    showInteractive={false}
                />
            </ReactFlow>
        </div>
    );
}