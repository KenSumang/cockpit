import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
// import Notes from '../components/Notes';

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
    <div className="w-[500px] h-[600px] m-auto rounded-2xl bg-black-light shadow-layered-out-lg">
      <h1>Dashboard</h1>
      <h2>Welcome, {session?.user?.email}</h2>
      <div className="">
        {/* <Notes /> */}
        <button
          onClick={handleSignOut}
          className="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Dashboard;