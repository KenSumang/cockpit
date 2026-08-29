import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const SignIn = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const { signIn } = UserAuth();
    const navigate = useNavigate();
    
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
        <div className="w-[500px] h-[600px] m-auto rounded-2xl bg-black-light shadow-layered-out-lg">
            <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
                <h2 className="font-bold pb-2">Sign in</h2>

                <p>
                    Don't have an account? <Link to="/signup">Sign up!</Link>
                </p>

                <div className="flex flex-col py-4">
                    <input
                        className="p-3 mt-6 shadow-layered-in-md rounded-2xl"
                        id="email"
                        type="email"
                        autoComplete="false"
                        name="email"
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
                    >
                        Sign In
                    </button>
                </div>
            </form>
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            
        </div>
    );
};

export default SignIn;