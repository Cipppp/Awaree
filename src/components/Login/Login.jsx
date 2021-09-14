import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ReactComponent as LoginImg } from '../../assets/login.svg';
import { ReactComponent as GithubImg } from '../../assets/github.svg';
import { ReactComponent as GoogleImg } from '../../assets/google.svg';
import { Link, useHistory } from 'react-router-dom';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, GithubLogin, GoogleLogin } = useAuth();
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

    return (
        <div className="grid md:grid-cols-2 items-center">
            <div className="left-side h-screen flex justify-center items-center bg-snow">
                <div>
                    <LoginImg className="p-16" />
                </div>
            </div>
            <div className="right-side bg-login h-full flex justify-center items-center">
                <div className="flex w-full justify-center">
                    <div className="login w-7/12 mt-20">
                        <div className="loginContainer font-josefin p-8 text-2xl text-jet">
                            <h1 className="text-2xl font-josefin font-bold flex justify-center">
                                Login
                            </h1>
                            <form onSubmit={handleSubmit} action="submit">
                                {/* Email  */}
                                <h1 className="text-xl">Email</h1>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg text-xl border-4 border-jet"
                                    ref={emailRef}
                                />
                                {/* Password  */}
                                <h1 className="text-xl pt-2">Password</h1>
                                <input
                                    type="password"
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-lg text-xl border-4 border-jet"
                                    ref={passwordRef}
                                />
                                {error && (
                                    <p className="text-red-700 text-xl flex justify-center mt-2 font-josefin">
                                        {error}
                                    </p>
                                )}
                                {/* button  */}
                                <div className="btnContainer flex place-items-start justify-center mb-5">
                                    <button
                                        disabled={loading}
                                        className="btn-auth hover:bg-jet hover:text-link focus:outline-none"
                                    >
                                        Log in
                                    </button>
                                </div>
                                <>
                                    <p className="text-xl">
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
                                            className="text-xl"
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
                                <GithubImg className="w-8 mr-4" />
                                Continue with Github
                            </button>{' '}
                            <button
                                disabled={loading}
                                onClick={GoogleLogin}
                                className="btn-auth-with hover:bg-jet hover:text-link focus:outline-none "
                            >
                                <GoogleImg className="w-8 mr-4 pt-2 mb-2" />
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
