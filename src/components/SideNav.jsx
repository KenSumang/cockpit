import Logo from '../assets/Logo_Text.avif';

function SideNav () {

    return (
        <nav className="side_nav h-dvh hidden md:block w-1/4 min-w-[220px] max-w-[300px] bg-black-light mr-2 rounded-2xl bg-black-light shadow-layered-out-lg">
            <div className="container">
                <div className="side_nav_wrapper">
                    <div className="side_nav_contents">
                        <img
                            src={Logo}
                            alt="Cockpit Logo"
                            className="w-50 mx-auto my-2"
                        />
                        <p>dashboard</p>
                        <p>statistics</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default SideNav;