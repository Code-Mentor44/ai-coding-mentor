const FilterBar = () => {

    const filters = [
        "All",
        "Weak",
        "Average",
        "Strong",
    ];

    return (

        <div className="flex flex-wrap gap-4 mt-8">

            {

                filters.map((filter) => (

                    <button
                        key={filter}
                        className="
                            px-5
                            py-2
                            rounded-full
                            bg-[#101827]
                            border
                            border-cyan-400/10
                            hover:border-cyan-400
                            transition
                        "
                    >

                        {filter}

                    </button>

                ))

            }

        </div>

    )

}

export default FilterBar;