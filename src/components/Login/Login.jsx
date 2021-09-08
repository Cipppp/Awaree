import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import loginImg from '../../assets/login.png';

function Login({
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
}) {
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
                            <h1 className="">Username</h1>
                            <input
                                type="text"
                                autoFocus
                                required
                                className="bg-form w-full p-3 focus:outline-none focus:shadow-outline rounded-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className="errorMsg">{emailError}</p>

                            <h1>Password</h1>
                            <input
                                type="password"
                                required
                                className="bg-form w-full p-3 focus:outline-none focus:shadow-outline rounded-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="errorMsg">{passwordError}</p>
                            <div className="btnContainer grid grid-rows-2 place-items-center">
                                {hasAccount ? (
                                    <>
                                        <button
                                            className="btn-auth hover:bg-jet hover:text-link"
                                            onClick={handleLogin}
                                        >
                                            Login
                                        </button>
                                        <p>
                                            Don't have an account?
                                            <span
                                                onClick={() =>
                                                    setHasAccount(!hasAccount)
                                                }
                                                className="pl-2 cursor-pointer text-snow"
                                            >
                                                Register
                                            </span>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn-auth hover:bg-jet hover:text-link focus:outline-none"
                                            onClick={handleSignup}
                                        >
                                            Register
                                        </button>
                                        <p>
                                            Have an account?
                                            <span
                                                onClick={() =>
                                                    setHasAccount(!hasAccount)
                                                }
                                                className="pl-2 cursor-pointer text-snow focus:outline-none"
                                            >
                                                Login
                                            </span>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
