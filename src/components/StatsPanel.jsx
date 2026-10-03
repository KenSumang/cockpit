import Notes from '../components/Notes';

function StatsPanel () {
    const today = new Date();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const fullMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
    
    return (
        <div className="stats w-[calc(100%-24px)] h-100 w-full flex flex-col items-center justify-between">
            <header className="mr-auto">
                <h2 className="text-white text-[30px] tracking-wider font-bold">Stats</h2>
                <p className="text-[#ADADAD] text-[18px]">{days[today.getDay()]}, {fullMonth} {today.getDate()}</p>
            </header>
            <Notes/>
        </div>
    );
}

export default StatsPanel;
