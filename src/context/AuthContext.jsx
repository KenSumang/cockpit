import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setLoading(false);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        }
    }, [])
    
    // Sign Up
    const signUp = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) return { success: false, error };
        return { success: true, data }
    };

    // Sign In
    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) return { success: false, error: error.message };
        
        setSession(data.session)
        return { success: true, data };
    };

    // Sign Out
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Sign out error: ", error);
    };

    return (
        <AuthContext.Provider value={{ session, loading, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => useContext(AuthContext);