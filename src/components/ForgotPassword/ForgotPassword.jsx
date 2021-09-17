import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ReactComponent as PasswordImg } from '../../assets/password.svg';
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
        <div className="lg:grid lg:grid-cols-2 items-center h-screen overflow-x-hidden">
            <div className="hidden lg:flex left-side h-screen justify-center items-center bg-snow">
                <div>
                    <PasswordImg className="p-20" />
                </div>
            </div>

            <div className="h-full flex justify-center items-center sm:bg-easy md:bg-veryEasy lg:bg-labsBullet xl:bg-medium ">
                <div className="flex w-full justify-center">
                    <div className="w-full mt-20 md:flex md:justify-center md:items-center">
                        <div className="w-screen md:w-8/12 justify-center items-center font-josefin p-8 text-sm sm:text-base md:text-lg xl:text-xl text-jet">
                            <h1 className="font-josefin font-bold flex justify-center">
                                Password Reset
                            </h1>

                            <form onSubmit={handleSubmit} action="submit">
                                {/* Email  */}
                                <h1 className="text-sm sm:text-base md:text-lg xl:text-xl pt-2">
                                    Email
                                </h1>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg text-sm sm:text-base md:text-lg xl:text-xl border-4 border-jet"
                                    ref={emailRef}
                                />

                                <div className="btnContainer grid grid-rows-2 place-items-center">
                                    <>
                                        <button
                                            disabled={loading}
                                            className="btn-auth-login hover:bg-jet hover:text-link focus:outline-none"
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
                                        {error && (
                                            <p className="text-white font-josefin">
                                                {error}
                                            </p>
                                        )}
                                        {message && (
                                            <p className="text-snow flex justify-center items-center text-center font-josefin">
                                                {message}
                                            </p>
                                        )}
                                    </>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
