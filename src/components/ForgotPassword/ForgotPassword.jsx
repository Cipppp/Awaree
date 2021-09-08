import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import loginImg from '../../assets/login.png';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions.');
        } catch {
            setError('Failed to reset passowrd.');
        }
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
                            <h1 className="">Password Reset</h1>
                            {error && (
                                <p className="text-white font-josefin">
                                    {error}
                                </p>
                            )}
                            {message && (
                                <p className="text-green-300 font-josefin">
                                    {message}
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

                                <div className="btnContainer grid grid-rows-2 place-items-center">
                                    <>
                                        <button
                                            disabled={loading}
                                            className="btn-auth hover:bg-jet hover:text-link"
                                        >
                                            Reset Passowrd
                                        </button>
                                        <p>
                                            <Link
                                                to="/login"
                                                className="pl-2 cursor-pointer text-snow"
                                            >
                                                Login
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

export default ForgotPassword;