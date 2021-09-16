import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();
    const customId = 'b6d2a12c-088a-43f4-911b-bf82e7497854';

    const notify = (message) => {
        toast.success(message, {
            toastId: customId,
            position: 'top-center',
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: true,
            draggablePercent: 50,
            pauseOnHover: false,
            draggable: true,
            theme: 'colored',
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setError('');

        var message = '';
        const promises = [];

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match!');
        }

        if (emailRef.current.value !== currentUser.email) {
            message = 'Email updated successfully!';
            promises.push(updateEmail(emailRef.current.value));
        } else if (
            passwordRef.current.value &&
            currentUser.password !== passwordRef.current.value
        ) {
            message = 'Password updated successfully!';
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises)
            .then(() => {
                if (!error) {
                    if (message) {
                        notify(message);
                    }
                    history.push('/settings');
                }
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to update account');
            })
            .finally(() => {
                //
            });
    }

    return (
        <div className="grid md:grid-cols-2 items-center">
            <div className="right-side bg-snow h-screen flex justify-center items-center col-span-2">
                <div className="font-josefin p-20 text-2xl text-jet w-6/12">
                    <h1 className="text-2xl font-josefin font-bold flex justify-center pt-10">
                        Update Profile
                    </h1>

                    <form onSubmit={handleSubmit} action="submit">
                        {/* Email  */}
                        <h1 className="text-xl pt-2">Email</h1>
                        <input
                            type="text"
                            autoFocus
                            required
                            defaultValue={currentUser.email}
                            className="w-full p-4 focus:outline-none font-bold tracking-wider rounded-lg bg-snow focus:border-jet text-xl border-4 border-jet"
                            ref={emailRef}
                        />
                        {/* Password  */}
                        <h1 className="text-xl pt-2">Password</h1>
                        <input
                            type="password"
                            placeholder="Leave blank to keep the same"
                            className="w-full p-4 placeholder-jet leading-3 focus:outline-none font-bold tracking-wider rounded-lg bg-snow focus:border-jet text-xl border-4 border-jet"
                            ref={passwordRef}
                        />
                        <h1 className="text-xl pt-2">Password confirmation</h1>
                        <input
                            type="password"
                            placeholder="Leave blank to keep the same"
                            className="w-full p-4 placeholder-jet leading-3 focus:outline-none font-bold tracking-wider rounded-lg bg-snow focus:border-jet text-xl border-4 border-jet"
                            ref={passwordConfirmRef}
                        />
                        {error && (
                            <p className="text-red-700 flex justify-center pt-2 font-josefin">
                                {error}
                            </p>
                        )}

                        {/* Button  */}
                        <div className="btnContainer grid grid-rows-2 place-items-center">
                            <>
                                <button className="btn-auth hover:bg-jet hover:text-snow focus:outline-none rounded-3xl">
                                    Update
                                </button>

                                <p>
                                    <Link
                                        to="/settings"
                                        className="cursor-pointer text-snow"
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
