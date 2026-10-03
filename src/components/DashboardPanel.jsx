import Notes from '../components/Notes';

function DashBoardPanel () {
    const today = new Date();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const fullMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
    
    return (
        <div className="dashboard w-[calc(100%-24px)] h-100 w-full items-center justify-between rounded-2xl bg-black-light shadow-layered-out-lg bg-red-200">
            <header className="mr-auto">
                <h2 className="text-white text-[30px] tracking-wider font-bold">Dashboard</h2>
                <p className="text-[#ADADAD] text-[18px]">{days[today.getDay()]}, {fullMonth} {today.getDate()}</p>
            </header>
            <Notes/>
        </div>
    );
}

export default DashBoardPanel;
