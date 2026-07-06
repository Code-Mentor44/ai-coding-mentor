export default function WorkspaceSidebar({
    activeTab,
    setActiveTab,
}) {
    const menuItems = [
        { id: "dashboard", label: "Dashboard" },
        { id: "problems", label: "Problems" },
        { id: "mentor", label: "AI Mentor" },
        { id: "history", label: "History" },
        { id: "settings", label: "Settings" },
    ];

    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 h-[760px]">
            <h2 className="text-xl font-bold mb-8">Workspace</h2>

            <div className="space-y-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full rounded-xl py-3 transition ${activeTab === item.id
                                ? "bg-cyan-500 text-black font-semibold"
                                : "border border-white/10 hover:bg-white/10"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}