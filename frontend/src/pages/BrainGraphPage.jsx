import BrainGraph from "../brainGraph-components/BrainGraph";
import FilterBar from "../brainGraph-components/FilterBar";
import TopicDetails from "../brainGraph-components/TopicDetails";
import GraphLegend from "../brainGraph-components/GraphLegend";

const BrainGraphPage = () => {

    return (

        <div className="min-h-screen bg-[#070B14] text-white">

            <div className="max-w-7xl mx-auto px-8 py-10">

                <div>

                    <h1 className="text-4xl font-bold">

                        Brain Graph

                    </h1>

                    <p className="mt-3 text-gray-400">

                        Explore your coding knowledge graph.

                    </p>

                </div>

                <FilterBar />

                <GraphLegend />

                <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-8">

                    <BrainGraph />

                    <TopicDetails />

                </div>

            </div>

        </div>

    )

}

export default BrainGraphPage