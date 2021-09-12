import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const isOnPage = history.location.pathname === '/login';

    return (
        <>
            <div className="flex items-center justify-between mx-auto fixed bg-black w-full">
                <Link to="/">
                    <h1 className="text-gray-300 md:bg-red-600 font-josefin text-3xl p-6">
                        Awaree.
                    </h1>
                </Link>
                {currentUser ? (
                    <>
                        <h1 className="text-gray-300 p-4 mr-10 text-xl font-josefin font-bold tracking-wider focus:outline-none">
                            {currentUser.displayName}
                        </h1>

                        <Link
                            className="text-gray-300 p-4 mr-10 text-xl font-josefin font-bold tracking-wider focus:outline-none"
                            to="/settings"
                        >
                            Settings
                        </Link>
                    </>
                ) : isOnPage ? null : (
                    <Link
                        className="text-gray-300 p-4 mr-10 text-2xl font-josefin font-bold tracking-wider focus:outline-none"
                        to="/login"
                    >
                        Log in
                    </Link>
                )}
            </div>
        </>
    );
}

export default Navbar;
