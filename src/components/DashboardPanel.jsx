import Notes from '../components/Notes';

function DashBoardPanel ({ activePanel}) {
    return (
        // <div className={`dashboard w-[calc(100%-24px)] h-100 flex-col w-full items-center justify-between rounded-2xl bg-black-light shadow-layered-out-lg ${
        <div className={`dashboard w-[calc(100%-24px)] h-100 flex-col w-full items-center justify-between bg-red-200 ${
            activePanel === "dashboard" ? "flex" : "hidden"
        }`}>
            <h2 className="text-white text-2xl tracking-wider font-semibold mr-auto">Dashboard</h2>
            <Notes/>
        </div>
    );
}

export default DashBoardPanel;
