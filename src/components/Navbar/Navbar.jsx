import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="flex items-center justify-between mx-auto fixed bg-black w-full">
            <h1 className="text-gray-300 font-josefin text-5xl p-8">Awaree.</h1>

            <a href="#" className="text-gray-300 font-josefin text-2xl pr-8">
                Login
            </a>

            {/* <Link></Link> */}
        </div>
    );
}

export default Navbar;
