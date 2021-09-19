import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as NotFoundImg } from '../assets/notFound.svg';

function PageNotFound() {
    return (
        <div className="overflow-hidden grid grid-rows-2 h-screen w-screen">
            <div className="items-center justify-center flex z-10">
                <div className="pt-10 font-josefin  items-center justify-center block">
                    <h1 className="text-3xl flex justify-center items-center">
                        Ooops, something went wrong!
                    </h1>
                    <Link
                        to="/Awaree"
                        className="text-lg flex font-bold text-blue-700 underline justify-center items-center"
                    >
                        Take me back to the Homepage
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-center pb-20 mb-20">
                <NotFoundImg className="w-4/12 h-4/12" />
            </div>
        </div>
    );
}

export default PageNotFound;
