import React from 'react';
import { Link, Redirect } from 'react-router-dom';

function Navbar({ user, handleLogout }) {
    return (
        <div className="flex items-center justify-between mx-auto fixed bg-black w-full">
            <Link to="/">
                <h1 className="text-gray-300 md:bg-red-600 font-josefin text-5xl p-8">
                    Awaree.
                </h1>
            </Link>

            {!user ? (
                <button className="text-gray-300 btn border-gray-300 border-2 hover:bg-gray-300 hover:text-black focus:outline-none">
                    <Link to="/login">Login</Link>
                </button>
            ) : (
                <button
                    className="text-gray-300 btn border-gray-300 border-2 hover:bg-gray-300 hover:text-black focus:outline-none"
                    onClick={handleLogout}
                >
                    <Link to="/">Logout</Link>
                    <Redirect to="/" />
                </button>
            )}
        </div>
    );
}

export default Navbar;
