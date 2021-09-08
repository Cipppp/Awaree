import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import loginImg from '../../assets/login.png';
import { Link, useHistory } from 'react-router-dom';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/status');
        } catch {}
        setLoading(false);
    }

    return (
        <div className="grid md:grid-cols-2 items-center">
            <div className="left-side h-screen flex justify-center items-center">
                <div>
                    <LazyLoadImage src={loginImg} />
                </div>
            </div>
            <div className="right-side bg-login h-full flex justify-center items-center">
                <div className="flex w-full justify-center">
                    <div className="login w-7/12 mt-20">
                        <div className="loginContainer font-josefin p-8 text-2xl text-jet">
                            {error && (
                                <p className="text-white font-josefin">
                                    {error}
                                </p>
                            )}
                            <form onSubmit={handleSubmit} action="submit">
                                {/* username  */}
                                <h1 className="">Email</h1>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:shadow-outline rounded-full"
                                    ref={emailRef}
                                />
                                {/* password  */}
                                <h1>Password</h1>
                                <input
                                    type="password"
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:shadow-outline rounded-full"
                                    ref={passwordRef}
                                />

                                {/* button  */}
                                <div className="btnContainer grid grid-rows-2 place-items-center">
                                    <>
                                        <button
                                            disabled={loading}
                                            className="btn-auth hover:bg-jet hover:text-link focus:outline-none"
                                        >
                                            Log In
                                        </button>
                                        <p>
                                            Don't have an account?
                                            <Link
                                                to="/register"
                                                className="pl-2 cursor-pointer text-snow"
                                            >
                                                Register
                                            </Link>
                                        </p>
                                    </>
                                </div>
                            </form>

                            <div>
                                <Link to="/forgot-password">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
