import Notes from '../components/Notes';

function StatsPanel ({ activePanel}) {
    return (
        <div className={`stats w-[calc(100%-24px)] h-100 w-full items-center justify-between rounded-2xl bg-black-light shadow-layered-out-lg ${
            activePanel === "stats" ? "flex" : "hidden"
        }`}>
            <h2>Stats</h2>
            <Notes/>
        </div>
    );
}

export default StatsPanel;
