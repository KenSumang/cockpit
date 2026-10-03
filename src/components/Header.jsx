import { useState, useEffect } from 'react';
// import { supabase } from '../utils/supabase';
import { UserAuth } from '../context/AuthContext';

import SettingsIcon from '../assets/settings.avif';
import UserIcon from '../assets/user.avif';
import Menu from '../assets/menu.avif';

function Header ({ onMenuClick, onSignOut }) {
  const { session } = UserAuth();
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

  const handleAccountSettingsToggle = () => {
    setIsAccountSettingsOpen((prev) => !prev);
  };

    return (
        <header class="header h-full w-full">
            <div class="container max-w-full">
                <div className="header_wrapper">
                    <div className="header_contents w-full h-full flex justify-between">
                       
                       <div className="menu-search flex mr-auto md:m-0 items-center gap-3">
                            <button
                                className="menu w-10 h-10 lex md:hidden bg-icon-bg shadow-layered-out-md rounded-full hover:bg-black-highlight hover:shadow-layered-highlight-md transition duration-300"
                                onClick={onMenuClick}
                            >
                                <img
                                    src={Menu}
                                    alt="Menu Icon"
                                    className="w-6 h-6 m-auto"
                                />
                            </button>
                            <input
                                className="p-3 hidden md:block shadow-layered-in-md rounded-xl my-auto"
                                id="search"
                                type="text"
                                placeholder="Search"
                            />
                        </div>
                        <div
                            className="settings-account relative flex ml-auto md:m-0 items-center gap-3">
                            <button
                                className="settings w-10 h-10 hidden md:flex bg-icon-bg shadow-layered-out-md rounded-full hover:bg-black-highlight hover:shadow-layered-highlight-md transition duration-300">
                                <img
                                    src={SettingsIcon}
                                    alt="Settings Icon"
                                    className="w-6 h-6 m-auto"
                                />
                            </button>

                            <button
                                className="user-dp w-10 h-10 flex bg-icon-bg rounded-full hover:shadow-layered-out-md transition duration-300">
                                <img
                                    src= {session.usericon ? session.usericon : UserIcon}
                                    alt="User Profile Picture"
                                    onClick={handleAccountSettingsToggle}
                                />
                            </button>
                            
                            <div className={`account-settings absolute gap-3 top-16 right-0 w-52 bg-black-light shadow-layered-out-lg rounded-xl p-4 ${
                                isAccountSettingsOpen ? "flex flex-col" : "hidden"}
                            `}>
                                <button
                                    className="hover:cursor-pointer inline-block w-full px-4 py-3 shadow-layered-out-md rounded-xl my-auto"
                                >
                                    <p className="text-left">Profile</p>
                                </button>
                                <button
                                    className="hover:cursor-pointer inline-block w-full px-4 py-3 shadow-layered-out-md rounded-xl my-auto"
                                >
                                    <p className="text-left">Preferences</p>
                                </button>
                                <button
                                    className="hover:cursor-pointer inline-block w-full px-4 py-3 shadow-layered-out-md rounded-xl my-auto"
                                    onClick={onSignOut}
                                >
                                    <p className="text-left">Sign Out</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;