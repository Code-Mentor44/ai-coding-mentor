import StatCard from "./StatCard";

import {
    Trophy,
    Flame,
    BrainCircuit,
    Target,
} from "lucide-react";

const StatsCards = () => {

    const stats = [
        {
            title: "Problems Solved",
            value: "128",
            subtitle: "+12 this week",
            icon: <Target size={24} />,
        },
        {
            title: "Current Streak",
            value: "15 🔥",
            subtitle: "Keep it going",
            icon: <Flame size={24} />,
        },
        {
            title: "Mastery",
            value: "82%",
            subtitle: "Overall progress",
            icon: <BrainCircuit size={24} />,
        },
        {
            title: "Leaderboard",
            value: "#27",
            subtitle: "College Rank",
            icon: <Trophy size={24} />,
        },
    ];

    return (

        <section
            className="
                mt-10
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            {stats.map((stat) => (

                <StatCard
                    key={stat.title}
                    {...stat}
                />

            ))}

        </section>

    );
};

export default StatsCards;