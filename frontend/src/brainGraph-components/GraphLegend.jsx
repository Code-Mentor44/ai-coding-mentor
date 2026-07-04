const GraphLegend = () => {

    return (

        <div className="flex gap-6 mt-6 text-sm">

            <div className="flex items-center gap-2">

                <div className="h-3 w-3 rounded-full bg-green-400" />

                Strong

            </div>

            <div className="flex items-center gap-2">

                <div className="h-3 w-3 rounded-full bg-yellow-400" />

                Average

            </div>

            <div className="flex items-center gap-2">

                <div className="h-3 w-3 rounded-full bg-red-400" />

                Weak

            </div>

        </div>

    )

}

export default GraphLegend;