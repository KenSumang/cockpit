import Notes from '../components/Notes';

function TrackerPanel () {
    return (
        <div className="tracker w-[calc(100%-24px)] h-100 w-full items-center justify-between rounded-2xl bg-black-light shadow-layered-out-lg">
            <h2>Tracker</h2>
            <Notes/>
        </div>
    );
}

export default TrackerPanel;
