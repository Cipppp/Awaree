import React, { useState, useEffect } from 'react';
import BarChart from '../Charts/BarChart';
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

function Status() {
    const { currentUser } = useAuth();
    const [duration, setDuration] = useState();

    useEffect(() => {
        if (!currentUser) {
            Redirect('/login');
        } else {
            const db = getDatabase();
            const durationRef = ref(db, 'Users/' + currentUser.uid);
            onValue(durationRef, (snapshot) => {
                const data = snapshot.val().duration;
                setDuration(data);
            });
        }
    });

    return (
        <div className="overflow-hidden">
            {/* First slide */}
            <div className="bg-snow h-screen w-screen flex justify-center items-center">
                <div className="w-9/12">
                    <BarChart
                        dataset={[
                            8,
                            Math.round(duration / 60),
                            112 - Math.round(duration / 60),
                        ]}
                        colors={['#353535', '#F5796D', '#2A9D8F']}
                        sectionLabel={['School', 'Homework', 'Freetime']}
                    />
                </div>
            </div>
        </div>
    );
}

export default Status;
