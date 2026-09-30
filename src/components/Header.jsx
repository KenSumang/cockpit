// import { useState, useEffect } from 'react';
// import { supabase } from '../utils/supabase';
import { UserAuth } from '../context/AuthContext';

function Header({}) {
  const { session } = UserAuth();

    return (
        <header class="header h-full w-full bg-red-200">
            <div class="container max-w-full">
                <div className="header_wrapper">
                    <div className="header_contents w-[calc(100%-24px)] h-[64px] my-4 flex justify-between m-auto rounded-2xl bg-black-light shadow-layered-out-lg">
                       
                        <input
                            // className="p-3 mt-6 shadow-layered-in-md rounded-xl my-auto bg-green-200"
                            className="p-3 shadow-layered-in-md rounded-xl my-auto"
                            id="search"
                            // type={showPassword ? "text" : "password"}
                            type="text"
                            placeholder="Search"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                        <h2>{session?.user?.email}</h2>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;