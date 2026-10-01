import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const SignIn = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const { signIn } = UserAuth();
    const navigate = useNavigate();
    
    // Handle Sign In
    const handleSignIn = async (e) => {
        e.preventDefault()
        const { session, error } = await signIn(email, password);

        if (error) {
            setError(error);

            setTimeout(() => {
                setError("");
            }, 3000);
        } else {
            navigate("/dashboard");
        }

        if (session) {
            setError("");
        }
    };

    return(
        <section className="w-full h-dvh">
            <div className="container max-w-full h-full">
                <div className="wrapper w-full h-full flex flex-col items-center justify-center">
                    <form
                        onSubmit={handleSignIn}
                        className="flex flex-col my-8 px-14 m-auto w-full max-w-[600px] justify-center h-fit lg:w-[500px] lg:h-[600px] lg:rounded-2xl lg:bg-black-light lg:shadow-layered-out-xl">

                        <h2 className="font-bold pb-2 text-[24px] lg:text-[28px]">Sign in</h2>

                        <p>
                            Don't have an account? <Link to="/signup" className="text-gray-300 hover:text-gray-400">
                                Sign up!
                            </Link>
                        </p>

                        <div className="relative flex flex-col gap-2 py-4">
                            <input
                                className="p-3 mt-6 shadow-layered-in-md rounded-2xl"
                                id="email"
                                type="email"
                                autoComplete="false"
                                name="email"
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
                                >
                                Sign In
                            </button>

                            {error && <p className="absolute bottom-23 left-1/2 -translate-x-1/2 text-red-600 text-center pt-4">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignIn;