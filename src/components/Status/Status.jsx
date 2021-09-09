import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Status() {
    const { currentUser } = useAuth();
    const [answers, setAnswers] = useState([]);

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="h-screen flex justify-center items-center bg-login col-span-2"></div>
            </div>
        </>
    );
}

export default Status;
