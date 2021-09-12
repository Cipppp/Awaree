import React, { useState } from 'react';

function ProgressBar({ done }) {
    const [style, setStyle] = useState({});

    setTimeout(() => {
        const newStyle = {
            opacity: 1,
            width: `${done}%`,
        };

        setStyle(newStyle);
    }, 1);

    return (
        <div className="progress w-6/12 h-screen flex items-center justify-start">
            <div
                className="flex items-center justify-center opacity-0 h-2 w-0 duration-1000 ease-out rounded-full progress-done bg-black shadow-md"
                style={style}
            ></div>
        </div>
    );
}

export default ProgressBar;
