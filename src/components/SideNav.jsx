import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo_Text.avif';

const linkClass = ({ isActive }) =>
    `hover:cursor-pointer inline-block w-full px-4 py-3 my-2 rounded-xl my-auto ${
        isActive && "shadow-layered-in-md"
}`; 

function SideNav ({ isOpen, onClose }) {

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    return (
        <>
            <div
                onClick={onClose}
                aria-hidden="true"
                className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden
                ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
            <nav
                className={`side_nav fixed top-0 left-0 z-40 h-svh w-1/4 min-w-[220px] max-w-[300px]
                    rounded-2xl bg-black-light shadow-layered-highlight
                    transition-transform duration-300 ease-out will-change-transform
                    ${isOpen ? "translate-x-4" : "-translate-x-[calc(50%)] -translate-x-full"}
                    md:static md:translate-x-0 md:mr-2 md:shadow-layered-out-lg`}>
                <div className="container">
                    <div className="side_nav_wrapper">
                        <div className="side_nav_contents">
                            <img
                                src={Logo}
                                alt="Cockpit Logo"
                                className="w-38 md:w-50 mx-auto my-2"
                            />

                            <div className="nav flex flex-col gap-4 mt-12 mx-6">
                                <NavLink to="/dashboard" className={linkClass} onClick={onClose}>Dashboard</NavLink>
                                <NavLink to="/stats" className={linkClass} onClick={onClose}>Stats</NavLink>
                                <NavLink to="/tracker" className={linkClass} onClick={onClose}>Tracker</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
        
    );
}

export default SideNav;