import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Navigate } from 'react-router-dom';

function PrivateRoute ({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: {session} }) => {
        setAuthenticated(!!session)
        setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (authenticated) {
      return <>{children}</>
    }
    return <Navigate to="/signin" />
  }
};

export default PrivateRoute;