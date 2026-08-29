import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

function SignUp() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const { session, signUp } = UserAuth();
    const navigate = useNavigate();
    
    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await signUp(email, password)

            if(result.success) {
                navigate('/dashboard');
            }
        } catch {
            setError("an error occurred");
        } finally {
           setLoading(false);
        }
    };

    return(
        <div className="w-[500px] h-[600px] m-auto rounded-2xl bg-black-light shadow-layered-out-lg">
            <form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
                <h2 className="font-bold pb-2">Sign up today!</h2>

                <p>
                    Already have an account? <Link to="/signin">Sign in!</Link>
                </p>

                <div className="flex flex-col py-4">
                    <input
                        className="p-3 mt-6 shadow-layered-in-md rounded-2xl"
                        id="email"
                        autoComplete="false"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div>
                        <input
                            className="p-3 mt-6 shadow-layered-in-md rounded-2xl"
                            id="password"
                            // type={showPassword ? "text" : "password"}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* <button
                            onClick="">
                            Show Password
                        </button> */}
                    </div>

                    <button
                        className="p-3 mt-6 shadow-layered-out-md rounded-2xl hover-cursor"
                        type="submit"
                        disabled={loading}
                        // onClick={signUp}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            
        </div>
    );
}
export default SignUp;