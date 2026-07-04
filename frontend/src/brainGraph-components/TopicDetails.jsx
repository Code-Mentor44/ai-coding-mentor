import { Flame, Target, Trophy } from "lucide-react";

const TopicDetails = () => {

    return (

        <div
            className="
                rounded-3xl
                bg-[#101827]
                border
                border-cyan-400/10
                p-6
            "
        >

            <h2 className="text-2xl font-semibold">

                Arrays

            </h2>

            <p className="text-gray-400 mt-2">

                One of your strongest topics.

            </p>

            <div className="mt-8 space-y-6">

                <div>

                    <p className="text-gray-500">

                        Mastery

                    </p>

                    <h3 className="text-3xl font-bold text-green-400">

                        92%

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Problems Solved

                    </p>

                    <h3 className="text-3xl font-bold">

                        38

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Weak Concepts

                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">

                        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-300">

                            Prefix Sum

                        </span>

                        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-300">

                            Sliding Window

                        </span>

                    </div>

                </div>

                <div>

                    <p className="text-gray-500">

                        Recommended

                    </p>

                    <div className="mt-3 space-y-2">

                        <div className="rounded-xl bg-[#0C1322] p-3">

                            House Robber

                        </div>

                        <div className="rounded-xl bg-[#0C1322] p-3">

                            Longest Consecutive Sequence

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default TopicDetails;