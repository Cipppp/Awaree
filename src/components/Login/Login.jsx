import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import fastImg from '../../assets/fast.png';

function Login() {
    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="bg-orange-500">{/* <LazyLoadImage src=/> */}</div>
            <div className="bg-black">2</div>
        </div>
    );
}

export default Login;
