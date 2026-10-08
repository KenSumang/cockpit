import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Navigate } from 'react-router-dom';
import LogoSmall from '../assets/logo_small.avif';

function PrivateRoute ({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: {session} }) => {
        setAuthenticated(!!session)
        setLoading(false);
        console.log(session)
    });
  }, []);

  if (loading) {
    return (
      <div className="loading_screen w-full h-full">
          <img
              src={LogoSmall}
              alt="Cockpit Logo"
              className="w-34 md:w-85 mx-auto my-auto"
          />
      </div>
    );
  } else {
    if (authenticated) {
      return <>{children}</>;
    }
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;