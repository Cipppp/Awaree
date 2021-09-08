import React, { useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const isOnPage = history.location.pathname === '/login';

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.pushState('/login');
        } catch {
            setError('Failed to log out.');
        }
    }

    const routeChange = () => {
        let path = '/login';
        history.push(path);
    };

    return (
        <>
            <div className="flex items-center justify-between mx-auto fixed bg-black w-full">
                <Link to="/">
                    <h1 className="text-gray-300 md:bg-red-600 font-josefin text-5xl p-8">
                        Awaree.
                    </h1>
                </Link>
                {currentUser ? (
                    <button
                        onClick={handleLogout}
                        className="text-gray-300 btn border-gray-300 border-2 hover:bg-gray-300 hover:text-black focus:outline-none"
                    >
                        Log out
                    </button>
                ) : isOnPage ? null : (
                    <button
                        className="text-gray-300 btn border-gray-300 border-2 hover:bg-gray-300 hover:text-black focus:outline-none"
                        onClick={routeChange}
                    >
                        Login
                    </button>
                )}
            </div>
        </>
    );
}

export default Navbar;
