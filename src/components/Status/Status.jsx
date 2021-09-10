import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDatabase, ref, onValue } from 'firebase/database';
import BarChart from '../Charts/BarChart';
import { Modal } from '../index';
import { Button } from '../componentStyles';
import { ReactComponent as AddImg } from '../../assets/plus.svg';

function Status() {
    const db = getDatabase();
    const { currentUser } = useAuth();
    const [answers, setAnswers] = useState([]);
    const [value, setValue] = useState(100);
    const [showModal, setShowModal] = useState(false);
    const [toggle, setToggle] = useState(false);

    function displayData() {
        const profileRef = ref(db, 'Answers/' + currentUser.uid + '/profile');
        onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            setValue(data);
        });
    }

    const openModal = () => {
        setShowModal((state) => !state);
    };

    const handleOnChange = (e) => {
        setValue(e.target.value);
        setToggle(true);
    };

    const handleOnBlur = (e) => {
        setToggle(false);
    };

    return (
        <div className="overflow-hidden">
            <div className="bg-login h-screen w-screen flex justify-center items-center">
                <div className="w-9/12">
                    {/* <button className="btn">Press {value}</button> */}
                    <BarChart
                        dataset={[8, 3, 5]}
                        colors={['#353535', '#F5796D', '#2A9D8F']}
                        sectionLabel={['School', 'Homework', 'Freetime']}
                    />
                </div>
            </div>
            <div className="bg-login sm:grid-cols-1 sm:grid-rows-6 grid md:grid-cols-3 md:grid-rows-2 h-screen w-screen p-20">
                {/* Card item */}
                <div className="bg-red-600 md:grid md:grid-rows-2 sm:m-4 md:m-10">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="grid sm:grid-cols-2 md:grid-cols-5 h-full w-full">
                            <div className="bg-red-600 flex items-center justify-center sm:col-span-1 md:col-span-2">
                                1
                            </div>
                            <div className="bg-green-600 flex items-center justify-center sm:col-span-1 md:col-span-3">
                                2
                            </div>
                        </div>
                    </div>

                    <div className="sm:hidden md:flex bg-black  h-full items-center justify-center">
                        <h1>b</h1>
                    </div>
                </div>
                {/* Card item */}
                <div className="flex w-full h-full items-center justify-center sm:m-4 md:m-10">
                    <Button onClick={openModal} className="border-2">
                        <AddImg className="h-6" />
                    </Button>
                    <Modal showModal={showModal} setShowModal={setShowModal} />
                </div>
            </div>
        </div>
    );
}

export default Status;
