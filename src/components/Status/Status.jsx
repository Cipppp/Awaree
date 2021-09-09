import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDatabase, ref, onValue } from 'firebase/database';

function Status() {
    const db = getDatabase();
    const { currentUser } = useAuth();
    const [answers, setAnswers] = useState([]);

    function displayData() {
        const profileRef = ref(db, 'Answers/' + currentUser.uid + '/profile');
        onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
    }

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="h-screen flex justify-center items-center bg-login col-span-2">
                    <button className="btn" onClick={displayData}>
                        Press
                    </button>
                </div>
            </div>
        </>
    );
}

export default Status;
