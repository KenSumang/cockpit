import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import DashBoardPanel from '../components/DashboardPanel';

function Dashboard () {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [activePanel, setActivePanel] = useState("dashboard");

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
      <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} activePanel={activePanel} setActivePanel={setActivePanel} />

      <div className="header_dashboard h-full w-full flex flex-col gap-4">
        <Header onMenuClick={handleSideNavButton} onSignOut={handleSignOut} />
        <DashBoardPanel activePanel={activePanel} />
      </div>
    </div>
  );
}

export default Dashboard;