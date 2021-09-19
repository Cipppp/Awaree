import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../components/contexts/AuthContext';
import { ReactComponent as LoginImg } from '../assets/login.svg';
import { ReactComponent as GithubImg } from '../assets/github.svg';
import { ReactComponent as GoogleImg } from '../assets/google.svg';
import { Link, useHistory } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, GithubLogin, GoogleLogin, currentUser, writeUserData } =
        useAuth();
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
        } catch {
            setError('Failed to login.');
        }
        setLoading(false);
    }

    const check = () => {
        var duration = '';
        try {
            const db = getDatabase();
            const durationRef = ref(db, 'Users/' + currentUser.uid);
            onValue(durationRef, (snapshot) => {
                duration = snapshot.val().duration;
            })
                .then({
                    //
                })
                .catch({
                    //;
                });
        } catch {
            if (currentUser) {
                writeUserData({ username: '', duration });
            }
        }
    };

    useEffect(() => {
        check();
    }, [check]);

    return (
        <div className="lg:grid lg:grid-cols-2 items-center h-screen overflow-x-hidden">
            <div className="hidden lg:flex left-side h-screen justify-center items-center bg-snow">
                <div className="">
                    <LoginImg className="lg:p-20 xl:p-16" />
                </div>
            </div>
            <div className="h-full flex justify-center items-center bg-login">
                <div className="flex w-full justify-center">
                    <div className="w-full mt-20 md:flex md:justify-center md:items-center">
                        <div className="w-screen md:w-8/12 justify-center items-center font-josefin p-8 text-sm sm:text-base md:text-lg xl:text-xl text-jet">
                            <h1 className="font-josefin font-bold flex justify-center">
                                Login
                            </h1>
                            <form onSubmit={handleSubmit} action="submit">
                                {/* Email  */}
                                <h1 className="">Email</h1>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg  border-4 border-jet"
                                    ref={emailRef}
                                />
                                {/* Password  */}
                                <h1 className=" pt-2">Password</h1>
                                <input
                                    type="password"
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg  border-4 border-jet"
                                    ref={passwordRef}
                                />
                                {error && (
                                    <p className="text-red-700  flex justify-center mt-2 font-josefin">
                                        {error}
                                    </p>
                                )}
                                {/* button  */}
                                <div className="btnContainer flex place-items-start justify-center mb-5">
                                    <button
                                        disabled={loading}
                                        className="btn-auth-login text-sm sm:text-base md:text-lg xl:text-xl hover:bg-jet hover:text-link focus:outline-none"
                                    >
                                        Log in
                                    </button>
                                </div>
                                <>
                                    <p className="">
                                        Don't have an account?
                                        <Link
                                            to="/register"
                                            className="pl-2 cursor-pointer text-snow"
                                        >
                                            Register
                                        </Link>
                                    </p>
                                    <div>
                                        <Link
                                            to="/forgot-password"
                                            className=""
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </>
                            </form>
                            <button
                                disabled={loading}
                                onClick={GithubLogin}
                                className="btn-auth-with hover:bg-jet hover:text-link focus:outline-none "
                            >
                                <GithubImg className="w-8 mr-4 text-sm sm:text-base md:text-lg xl:text-xl" />
                                Continue with Github
                            </button>{' '}
                            <button
                                disabled={loading}
                                onClick={GoogleLogin}
                                className="btn-auth-with hover:bg-jet hover:text-link focus:outline-none "
                            >
                                <GoogleImg className="w-8 mr-4 pt-2 mb-2 text-sm sm:text-base md:text-lg xl:text-xl" />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
