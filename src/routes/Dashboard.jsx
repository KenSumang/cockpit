import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Notes from '../components/Notes';
import Header from '../components/Header';
import SideNav from '../components/SideNav';

function Dashboard () {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleSideNavButton = () => {
      setIsSideNavOpen((prev) => !prev);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut();
      navigate("/");
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };
  
  return (
    <div className="h-full w-full relative flex p-4 gap-4 sm:p-6 overflow-x-hidden">
      <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} />

      <div className="header_dashboard h-full w-full flex flex-col gap-4">
        <Header onMenuClick={handleSideNavButton} />
        <div className="dashboard w-[calc(100%-24px)] h-100 w-full flex items-center justify-between rounded-2xl bg-black-light shadow-layered-out-lg">
          <Notes/>
          <button
            onClick={handleSignOut}
            className="hover:cursor-pointer inline-block w-[10rem] px-4 py-3 mt-4 shadow-layered-out-md rounded-xl my-auto"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;