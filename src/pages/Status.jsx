import React, { useState, useEffect } from 'react';
import BarChart from '../components/Charts/BarChart';
import { useAuth } from '../components/contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

function Status() {
    const { currentUser } = useAuth();
    const [duration, setDuration] = useState();

    async function check() {
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
    }

    useEffect(() => {
        check();
    }, []);

    return (
        <div className="overflow-hidden">
            {/* First slide */}
            {console.log(
                'Status: ' + 'Duration: ',
                duration,
                ' Math.round(duration / 60): ',
                Math.round(duration / 60)
            )}
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
