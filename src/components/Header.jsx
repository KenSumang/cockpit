// import { useState, useEffect } from 'react';
// import { supabase } from '../utils/supabase';
import { UserAuth } from '../context/AuthContext';
import SettingsIcon from '../assets/settings.avif';
import UserIcon from '../assets/user.avif';

function Header({ onMenuClick }) {
  const { session } = UserAuth();

    return (
        <header class="header h-full w-full">
            <div class="container max-w-full">
                <div className="header_wrapper">
                    <div className="header_contents w-full h-full flex justify-between">
                       
                        <input
                            className="p-3 hidden md:block shadow-layered-in-md rounded-xl my-auto"
                            id="search"
                            type="text"
                            placeholder="Search"
                        />
                        <div
                            className="settings-account flex ml-auto md:m-0 items-center gap-3">
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
                                    onClick={onMenuClick}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;