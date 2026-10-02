import Notes from '../components/Notes';

function StatsPanel ({ activePanel}) {
    const today = new Date();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const fullMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
    
    return (
        <div className={`stats w-[calc(100%-24px)] h-100 flex-col w-full items-center justify-between ${
            activePanel === "stats" ? "flex" : "hidden"
        }`}>
            <header className="mr-auto">
                <h2 className="text-white text-[30px] tracking-wider font-bold">Stats</h2>
                <p className="text-[#ADADAD] text-[18px]">{days[today.getDay()]}, {fullMonth} {today.getDate()}</p>
            </header>
            <Notes/>
        </div>
    );
}

export default StatsPanel;
