import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ReactComponent as RegisterImg } from '../../assets/authentication.svg';
import { Link, useHistory } from 'react-router-dom';

function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/intro');
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);
    }

    return (
        <div className="grid md:grid-cols-2 items-center overflow-hidden">
            <div className="left-side h-screen flex justify-center items-center bg-snow order-last">
                <div>
                    <RegisterImg className="ml-20 p-10 w-10/12" />
                </div>
            </div>

            <div className="right-side bg-login h-full flex justify-center items-center">
                <div className="flex w-full justify-center">
                    <div className="login w-7/12 mt-20">
                        <div className="loginContainer font-josefin p-8 text-2xl text-jet">
                            <form onSubmit={handleSubmit} action="submit">
                                {/* username  */}
                                <h1 className="text-xl">Email</h1>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-full text-xl border-4 border-jet"
                                    ref={emailRef}
                                />
                                {/* password  */}
                                <h1 className="text-xl pt-2">Password</h1>
                                <input
                                    type="password"
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-full text-xl border-4 border-jet"
                                    ref={passwordRef}
                                />
                                <h1 className="text-xl pt-2">
                                    Password confirmation
                                </h1>
                                <input
                                    type="password"
                                    required
                                    className="bg-form w-full p-3 focus:outline-none focus:border-snow rounded-full text-xl border-4 border-jet"
                                    ref={passwordConfirmRef}
                                />

                                {error && (
                                    <p className="text-red-700 text-xl flex justify-center mt-2 font-josefin">
                                        {error}
                                    </p>
                                )}
                                {/* button  */}
                                <div className="btnContainer grid grid-rows-2 place-items-center">
                                    <>
                                        <button
                                            disabled={loading}
                                            className="btn-auth hover:bg-jet hover:text-link focus:outline-none"
                                        >
                                            Register
                                        </button>
                                        <p className="text-xl">
                                            Already have an account?
                                            <Link
                                                to="/login"
                                                className="pl-2 text-xl cursor-pointer text-snow"
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
