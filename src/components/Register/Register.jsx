import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ReactComponent as RegisterImg } from '../../assets/authentication.svg';
import { Link, useHistory } from 'react-router-dom';

function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();
    const { signup, writeUserData, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (
                passwordRef.current.value !== passwordConfirmRef.current.value
            ) {
                return setError('Password do not match');
            }

            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            // sendEmailVerification(auth.currentUser).then(() => {
            //     console.log('Email sent');
            // });
            history.push('/intro');
        } catch {
            setError('Failed to create account.');
        }
        setLoading(false);
    }

    // Check for user uid
    const check = () => {
        if (currentUser) {
            writeUserData({ username: usernameRef.current.value, duration: 0 });
        }
    };

    useEffect(() => {
        check();
    }, [check]);

    return (
        <div className="lg:grid lg:grid-cols-2 items-center h-screen overflow-x-hidden">
            <div className="hidden lg:flex left-side h-screen justify-center items-center bg-snow order-last">
                <div>
                    <RegisterImg className="ml-20 p-10 w-10/12" />
                </div>
            </div>

            <div className="h-full flex justify-center items-center bg-login">
                <div className="flex w-full justify-center">
                    <div className="w-full mt-20 md:flex md:justify-center md:items-center">
                        <div className="w-screen md:w-8/12 justify-center items-center font-josefin p-8 text-sm sm:text-base md:text-lg xl:text-xl text-jet">
                            <h1 className="font-josefin font-bold flex justify-center">
                                Register
                            </h1>
                            <form onSubmit={handleSubmit} action="submit">
                                {/* Email  */}
                                <h1 className="text-sm sm:text-base md:text-lg xl:text-xl">
                                    Email
                                </h1>
                                <input
                                    type="email"
                                    autoFocus
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg text-sm sm:text-base md:text-lg xl:text-xl border-4 border-jet"
                                    ref={emailRef}
                                />
                                {/* Username  */}
                                <h1 className="text-sm sm:text-base md:text-lg xl:text-xl">
                                    Username
                                </h1>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg text-sm sm:text-base md:text-lg xl:text-xl border-4 border-jet"
                                    ref={usernameRef}
                                />
                                {/* Password  */}
                                <h1 className="text-sm sm:text-base md:text-lg xl:text-xl pt-2">
                                    Password
                                </h1>
                                <input
                                    type="password"
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg text-sm sm:text-base md:text-lg xl:text-xl border-4 border-jet"
                                    ref={passwordRef}
                                />
                                <h1 className="text-sm sm:text-base md:text-lg xl:text-xl pt-2">
                                    Password confirmation
                                </h1>
                                <input
                                    type="password"
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg text-sm sm:text-base md:text-lg xl:text-xl border-4 border-jet"
                                    ref={passwordConfirmRef}
                                />

                                {error && (
                                    <p className="text-red-700 text-sm sm:text-base md:text-lg xl:text-xl flex justify-center mt-2 font-josefin">
                                        {error}
                                    </p>
                                )}
                                {/* button  */}
                                <div className="btnContainer grid grid-rows-2 place-items-center">
                                    <>
                                        <button
                                            disabled={loading}
                                            className="btn-auth-login hover:bg-jet hover:text-link focus:outline-none"
                                        >
                                            Register
                                        </button>
                                        <p className="text-sm sm:text-base md:text-lg xl:text-xl">
                                            Already have an account?
                                            <Link
                                                to="/login"
                                                className="pl-2 text-sm sm:text-base md:text-lg xl:text-xl cursor-pointer text-snow"
                                            >
                                                Log in
                                            </Link>
                                        </p>
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

export default Register;
