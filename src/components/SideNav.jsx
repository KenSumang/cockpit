import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../assets/dashboard.svg?react';
import StatsIcon from '../assets/statistics.svg?react';
import TrackerIcon from '../assets/tracker.svg?react';
import MaximizeIcon from '../assets/maximize.svg?react';

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
        `hover:cursor-pointer flex items-center gap-3.5 h-12 my-2 rounded-xl my-auto ${
            isActive ? "shadow-layered-in-md text-white" : "text-[#ADADAD] hover:text-white transition duration-300"} ${
            isSideNavMax ? "w-full px-3" : "w-fit px-3.5"
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
                className={`side_nav fixed top-0 left-0 z-40 h-svh max-w-[300px]
                    rounded-2xl bg-black-light shadow-layered-highlight p-2
                    transition-transform duration-300 ease-out will-change-transform
                    ${isOpen ? "translate-x-4" : "-translate-x-[calc(50%)] -translate-x-full"}
                    ${isSideNavMax ? "w-1/4" : "w-fit"}
                    md:static md:translate-x-0 md:mr-2 md:shadow-layered-out-lg`}>
                <div className="container h-full">
                    <div className="side_nav_contents flex flex-col h-full">

                        <div className="nav flex flex-col">

                            <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
                                <DashboardIcon className="w-4 md:w-5 shrink-0 h-fit -z-1" />
                                <span className={`text-[16px] font-semibold ${isSideNavMax ? "block" : "hidden"}`}>Dashboard</span>
                            </NavLink>

                            <NavLink to="/stats" className={linkClass} onClick={onClose}>
                                <StatsIcon className="w-4 md:w-5 shrink-0 h-fit -z-1" />
                                <span className={`text-[16px] font-semibold ${isSideNavMax ? "block" : "hidden"}`}>Stats</span>
                            </NavLink>

                            <NavLink to="/tracker" className={linkClass} onClick={onClose}>
                                <TrackerIcon className="w-4 md:w-5 shrink-0 h-fit -z-1" />
                                <span className={`text-[16px] font-semibold ${isSideNavMax ? "block" : "hidden"}`}>Tracker</span>
                            </NavLink>
                        </div>

                        <button
                            className={`flex gap-3 items-center rounded-xl h-12 w-fit mt-auto text-[#ADADAD] hover:text-white hover:cursor-pointer transition duration-300 ${
                            isSideNavMax ? "px-3 ml-auto" : "px-3.5"
                        }`}
                            onClick={handleSideNavMax}>
                            <MaximizeIcon className="w-4 md:w-5 shrink-0 h-fit" />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default SideNav;