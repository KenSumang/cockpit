import Notes from '../components/Notes';

function DashBoardPanel () {
    return (
        <div className="dashboard w-[calc(100%-24px)] h-100 w-full flex items-center justify-between rounded-2xl bg-black-light shadow-layered-out-lg">
          <Notes/>
        </div>
    );
}

export default DashBoardPanel;
