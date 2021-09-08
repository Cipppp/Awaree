import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory, Redirect } from 'react-router-dom';

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }

        const promises = [];
        setLoading(true);
        setError('');

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                history('/status');
            })
            .catch(() => {
                setError('Failed to update account');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="grid md:grid-cols-2 items-center">
            <div className="right-side bg-login h-screen flex justify-center items-center col-span-2">
                <div className="loginContainer font-josefin p-8 text-2xl text-jet">
                    <h1 className="">Update Profile</h1>
                    {error && (
                        <p className="text-white font-josefin">{error}</p>
                    )}
                    <form onSubmit={handleSubmit} action="submit">
                        {/* username  */}
                        <h1 className="">Email</h1>
                        <input
                            type="text"
                            autoFocus
                            required
                            defaultValue={currentUser.email}
                            className="bg-form w-full p-3 focus:outline-none focus:shadow-outline rounded-full"
                            ref={emailRef}
                        />
                        {/* password  */}
                        <h1>Password</h1>
                        <input
                            type="password"
                            placeholder="Leave blank to keep the same"
                            className="bg-form w-full p-3 focus:outline-none focus:shadow-outline rounded-full"
                            ref={passwordRef}
                        />
                        <h1>Password confirmation</h1>
                        <input
                            type="password"
                            placeholder="Leave blank to keep the same"
                            className="bg-form w-full p-3 focus:outline-none focus:shadow-outline rounded-full"
                            ref={passwordConfirmRef}
                        />

                        {/* button  */}
                        <div className="btnContainer grid grid-rows-2 place-items-center">
                            <>
                                <button
                                    disabled={loading}
                                    className="btn-auth hover:bg-jet hover:text-link focus:outline-none"
                                >
                                    Update
                                </button>
                                <p>
                                    <Link
                                        to="/status"
                                        className="pl-2 cursor-pointer text-snow"
                                    >
                                        Cancel
                                    </Link>
                                </p>
                            </>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
