import Notes from '../components/Notes';

function DashBoardPanel ({ activePanel}) {
    return (
        <div className={`dashboard w-[calc(100%-24px)] h-100 w-full items-center justify-between rounded-2xl bg-black-light shadow-layered-out-lg ${
            activePanel === "dashboard" ? "flex" : "hidden"
        }`}>
            <h2>Dashboard</h2>
            <Notes/>
        </div>
    );
}

export default DashBoardPanel;
