import React from 'react';

function Navbar() {
    return (
        <div className="flex items-center justify-between mx-auto  bg-black w-full">
            <h1 className="text-gray-300 font-josefin text-5xl p-8">Awaree.</h1>

            <a href="#" className="text-gray-300 font-josefin text-2xl pr-8">
                Login
            </a>
        </div>
    );
}

export default Navbar;
