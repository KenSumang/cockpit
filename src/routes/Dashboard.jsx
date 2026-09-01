import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Notes from '../components/Notes';

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

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
    // <div className="w-[500px] h-[600px] m-auto rounded-2xl bg-black-light shadow-layered-out-lg">
    //   <h1>Dashboard</h1>
    //   <h2>Welcome, {session?.user?.email}</h2>
    //   <div className="">
    //     {/* <Notes /> */}
    //     <button
    //       onClick={handleSignOut}
    //       className="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
    //     >
    //       Sign Out
    //     </button>
    //   </div>
    // </div>
    <div className="h-full w-full flex flex-col">
      <div className="header w-[calc(100%-24px)] h-[64px] my-4 flex justify-between m-auto rounded-2xl bg-black-light shadow-layered-out-lg">
        <h2>Cockpit</h2>
        <input
            className="p-3 mt-6 shadow-layered-in-md rounded-xl"
            id="search"
            // type={showPassword ? "text" : "password"}
            type="text"
            placeholder="Search"
            // onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignOut}
          className="hover:cursor-pointer inline-block w-[10rem] px-4 py-3 mt-4 shadow-layered-out-md rounded-xl my-auto"
        >
          Sign Out
        </button>
        <h2>{session?.user?.email}</h2>
      </div>
      <div className="header w-[calc(100%-24px)] h-100 my-4 flex items-center justify-between m-auto rounded-2xl bg-black-light shadow-layered-out-lg">
        <Notes/>
      </div>
    </div>
  )
}

export default Dashboard;