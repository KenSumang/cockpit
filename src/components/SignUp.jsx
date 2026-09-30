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
        <section className="w-full h-dvh">
            <div className="container max-w-full h-full">
                <div className="wrapper w-full h-full flex">
                    <form
                        onSubmit={handleSignUp}
                        className="flex flex-col py-8 px-14 m-auto w-[450px] justify-center h-dvh lg:w-[500px] lg:h-[600px]  lg:rounded-2xl lg:bg-black-light lg:shadow-layered-out-xl">
                        
                        <h2 className="font-bold pb-2 text-[24px] lg:text-[28px]">Sign up today!</h2>

                        <p>
                            Already have an account? <Link to="/signin" className="text-gray-300 hover:text-gray-400">Sign in!</Link>
                        </p>

                        <div className="flex flex-col gap-2 py-4">
                            <input
                                className="p-3 mt-6 shadow-layered-in-md rounded-2xl"
                                id="email"
                                autoComplete="false"
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            
                            <input
                                className="p-3 mt-6 shadow-layered-in-md rounded-2xl"
                                id="password"
                                // type={showPassword ? "text" : "password"}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                className="p-3 mt-20 shadow-layered-out-md rounded-2xl text-gray-300 lg:mt-15 hover-cursor hover:bg-black-highlight hover:shadow-layered-highlight-md transition duration-300"
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
            </div>
        </section>

        
    );
}
export default SignUp;