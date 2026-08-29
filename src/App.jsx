import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from "./components/SignIn";
import { UserAuth } from './context/AuthContext';

function App() {
  const { user } = UserAuth();
  return(
    <SignIn />
  );
}

export default App;