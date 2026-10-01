import { useState, useEffect } from 'react'

import Logo from '../assets/Logo_Text.avif';

function SideNav ({ isOpen, onClose}) {
    return (
        // <nav className="side_nav h-dvh hidden md:block w-1/4 min-w-[220px] max-w-[300px] bg-black-light mr-2 rounded-2xl bg-black-light shadow-layered-out-lg">
        <>
            <div
                onClick={onClose}
                aria-hidden="true"
                className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden
                ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
            <nav
                // className={`side_nav h-dvh shadow-layered-highlight absolute w-1/4 min-w-[220px] max-w-[300px] bg-black-light rounded-2xl bg-black-light transition-all duration-300 ${
                //     isOpen
                //         ? 'right-4'
                //         : '-right-full'}
                //         md:static md:right-auto md:mr-2 md:shadow-layered-out-lg
                //     `}>
                
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
                                
                                <button
                                    className="hover:cursor-pointer inline-block w-full px-4 py-3 shadow-layered-out-md rounded-xl my-auto"
                                >
                                    <p>Dashboard</p>
                                </button>
                                <button
                                    // className="hover:cursor-pointer inline-block w-full px-4 py-3 shadow-layered-out-md rounded-xl my-auto"
                                    className="p-3 hidden md:block shadow-layered-in-md rounded-xl my-auto"
                                >
                                    <p>Dashboard</p>
                                </button>
                                <button
                                    className="hover:cursor-pointer inline-block w-full px-4 py-3 my-2 shadow-layered-out-md rounded-xl my-auto"
                                >
                                    <p>Tracker</p>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="hover:cursor-pointer inline-block w-full px-4 py-3 my-2 shadow-layered-out-md rounded-xl my-auto md:hidden"
                                >
                                    <p>Close</p>
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