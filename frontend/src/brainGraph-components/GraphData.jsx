import dagre from "@dagrejs/dagre";
import CustomNode from "./CustomNode";

export const nodeTypes = {
    custom: CustomNode,
};

const nodeWidth = 180;
const nodeHeight = 90;

const dagreGraph = new dagre.graphlib.Graph();

dagreGraph.setDefaultEdgeLabel(() => ({}));

dagreGraph.setGraph({
    rankdir: "TB",
    nodesep: 90,
    ranksep: 120,
});

const nodes = [
    {
        id: "arrays",
        type: "custom",
        data: {
            label: "Arrays",
            mastery: 95,
        },
    },
    {
        id: "graphs",
        type: "custom",
        data: {
            label: "Graphs",
            mastery: 72,
        },
    },
    {
        id: "strings",
        type: "custom",
        data: {
            label: "Strings",
            mastery: 83,
        },
    },
    {
        id: "dp",
        type: "custom",
        data: {
            label: "Dynamic Programming",
            mastery: 28,
        },
    },
    {
        id: "trees",
        type: "custom",
        data: {
            label: "Trees",
            mastery: 65,
        },
    },
];

const edges = [
    {
        id: "e1",
        source: "arrays",
        target: "graphs",
        animated: true,
    },
    {
        id: "e2",
        source: "arrays",
        target: "strings",
        animated: true,
    },
    {
        id: "e3",
        source: "graphs",
        target: "dp",
        animated: true,
    },
    {
        id: "e4",
        source: "strings",
        target: "trees",
        animated: true,
    },
];

nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
        width: nodeWidth,
        height: nodeHeight,
    });
});

edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
});

dagre.layout(dagreGraph);

export const initialNodes = nodes.map((node) => {
    const position = dagreGraph.node(node.id);

    return {
        ...node,
        position: {
            x: position.x - nodeWidth / 2,
            y: position.y - nodeHeight / 2,
        },
    };
});

export const initialEdges = edges.map((edge) => ({
    ...edge,
    style: {
        stroke: "#22d3ee",
        strokeWidth: 2.5,
    },
}));