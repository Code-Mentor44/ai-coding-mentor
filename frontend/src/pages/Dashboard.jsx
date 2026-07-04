import WelcomeBanner from "../dashboard-components/WelcomeBanner";
import StatsCards from "../dashboard-components/StatsCard";
import ContinueCard from "../dashboard-components/ContinueCard";
import BrainGraphPreview from "../dashboard-components/BrainGraphPreview";
import RoastCard from "../dashboard-components/Roastcard";

export default function Dashboard() {

    return (

        <div className="min-h-screen bg-[#070B14] text-white">

            <div className="max-w-7xl mx-auto px-8 py-10">

                <WelcomeBanner />

                <StatsCards />

                <ContinueCard />

                <div className="grid lg:grid-cols-2 gap-6 mt-8">

                    <BrainGraphPreview />

                    <RoastCard />

                </div>

            </div>

        </div>

    )

}