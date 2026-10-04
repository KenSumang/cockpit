import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo_Text.avif';
import LogoSmall from '../assets/logo_small.avif';
import DashboardIcon from '../assets/dashboard.svg?react';
import StatsIcon from '../assets/statistics.svg?react';
import TrackerIcon from '../assets/tracker.svg?react';

function SideNav ({ isOpen, onClose }) {
    const [isSideNavMax, setIsSideNavMax] = useState(false);

    const handleSideNavMax = () => {
        setIsSideNavMax((prev) => !prev);
    }

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);
    
    const linkClass = ({ isActive }) =>
        `hover:cursor-pointer flex gap-3 px-4 py-3 my-2 rounded-xl my-auto ${
            isActive ? "shadow-layered-in-md text-white" : "text-[#ADADAD] hover:text-white transition duration-300"} ${
            isSideNavMax ? "w-full" : "w-fit"
    }`;

    return (
        <>
            <div
                onClick={onClose}
                aria-hidden="true"
                className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden
                ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
            <nav
                // className={`side_nav fixed top-0 left-0 z-40 h-svh w-1/4 min-w-[220px] max-w-[300px]
                className={`side_nav fixed top-0 left-0 z-40 h-svh max-w-[300px]
                    rounded-2xl bg-black-light shadow-layered-highlight
                    transition-transform duration-300 ease-out will-change-transform
                    ${isOpen ? "translate-x-4" : "-translate-x-[calc(50%)] -translate-x-full"}
                    ${isSideNavMax ? "w-1/4" : "w-fit"}
                    md:static md:translate-x-0 md:mr-2 md:shadow-layered-out-lg`}>
                <div className="container">
                    <div className="side_nav_wrapper">
                        <div className="side_nav_contents">
                            <img
                                src={ isSideNavMax ? Logo : LogoSmall } 
                                alt="Cockpit Logo"
                                className={`mx-auto my-2 ${
                                    isSideNavMax ? "w-38 md:w-50" : "w-12"
                                }`}
                            />

                            <div className="nav flex flex-col gap-4 mt-12 mx-6">

                                <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
                                    <DashboardIcon className="h-5 w-5 shrink-0" />
                                    <span className={`${isSideNavMax ? "block" : "hidden"}`}>Dashboard</span>
                                </NavLink>

                                <NavLink to="/stats" className={linkClass} onClick={onClose}>
                                    <StatsIcon className="w-5 h-5 shrink-0" />
                                    <span className={`${isSideNavMax ? "block" : "hidden"}`}>Stats</span>
                                </NavLink>

                                <NavLink to="/tracker" className={linkClass} onClick={onClose}>
                                    <TrackerIcon className="w-5 h-5 shrink-0" />
                                    <span className={`${isSideNavMax ? "block" : "hidden"}`}>Tracker</span>
                                </NavLink>

                                <button
                                    className={`hover:cursor-pointer inline-block px-4 py-3 shadow-layered-out-md rounded-xl my-auto ${
                                        isSideNavMax ? "w-full" : "w-12"
                                    }`}
                                    onClick={handleSideNavMax}
                                >
                                    <p className="text-left">Close</p>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default SideNav;