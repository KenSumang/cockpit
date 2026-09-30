import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Notes from '../components/Notes';
import Header from '../components/Header';

function Dashboard () {
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
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="header w-[calc(100%-24px)] h-100 my-4 flex items-center justify-between m-auto rounded-2xl bg-black-light shadow-layered-out-lg">
        <Notes/>
        <button
          onClick={handleSignOut}
          className="hover:cursor-pointer inline-block w-[10rem] px-4 py-3 mt-4 shadow-layered-out-md rounded-xl my-auto"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Dashboard;