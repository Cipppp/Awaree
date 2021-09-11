import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BarChart from '../Charts/BarChart';
import { Modal } from '../index';
import { Button } from '../componentStyles';
import { ReactComponent as AddImg } from '../../assets/plus.svg';
import { getDatabase, ref, onValue } from 'firebase/database';
import { set, update, push, query, orderByChild } from 'firebase/database';
import Card from '../Card/Card';

function Status() {
    const [value, setValue] = useState(100);
    const [showModal, setShowModal] = useState(false);
    const [toggle, setToggle] = useState(false);
    const { currentUser } = useAuth();
    const [snapValue, setSnapValue] = useState([]);
    const db = getDatabase();
    const dbRef = query(
        ref(db, 'Homeworks/' + currentUser.uid),
        orderByChild('/priority')
    );

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

    function displayUserData() {
        const db = getDatabase();
        const dbRef = query(
            ref(db, 'Homeworks/' + currentUser.uid),
            orderByChild('/priority')
        );
        setSnapValue([]);

        onValue(
            dbRef,
            (snapshot) => {
                snapshot.forEach((childSnap) => {
                    // console.log(childSnap.val());
                    // setSnapValue([...snapValue, childSnap.val()]);
                });
            },
            {
                onlyOnce: true,
            }
        );
    }

    useEffect(() => {
        // displayUserData();
    });

    return (
        <div className="overflow-hidden">
            {/* First slide */}
            <div className="bg-snow h-screen w-screen flex justify-center items-center">
                <div className="w-9/12">
                    <BarChart
                        dataset={[8, 3, 5]}
                        colors={['#353535', '#F5796D', '#2A9D8F']}
                        sectionLabel={['School', 'Homework', 'Freetime']}
                    />
                </div>
            </div>
            {/* Second slide */}
            <div className="bg-snow sm:grid-cols-1 sm:grid-rows-6 grid md:grid-cols-3 md:grid-rows-2 h-screen w-screen p-20">
                <Modal showModal={showModal} setShowModal={setShowModal} />
                {onValue(
                    dbRef,
                    (snapshot) => {
                        snapshot.forEach((childSnap) => {
                            <div className="flex justify-center items-center">
                                {childSnap.val()}
                                {/* Card item with database value*/}
                            </div>;
                        });
                    },
                    {
                        onlyOnce: true,
                    }
                )}
                {}
                {/* Card item */}
                <div className="md:grid md:grid-rows-2 sm:m-4 md:m-10 rounded-3xl shadow-xl">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="grid grid-cols-2  h-full w-full ">
                            <div className="bg-snow items-center grid grid-rows-2 pl-4 pr-4 pt-2 pb-2 justify-center rounded-tl-3xl">
                                <h2 className="sm:text-sm font-josefin font-bold md:text-lg text-black ">
                                    Math homework
                                </h2>
                                <p className="font-josefin text-sm text-cardBullet">
                                    Difficulty: Hard
                                </p>
                            </div>
                            <div className="bg-snow  w-full items-center justify-center  pl-4 pt-2 pr-4 pb-2 flex rounded-tr-3xl">
                                <div className="inline-block w-full">
                                    <span className="h-6 bg-login rounded-3xl w-full flex"></span>
                                    <p className="font-josefin text-login text-sm flex justify-center items-center pt-2 font-bold">
                                        2 hours
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-jet font-bold bg-card w-full h-full items-center grid grid-rows-2 p-2 rounded-bl-3xl rounded-br-3xl">
                        <h1
                            className="flex text-xl text-josefin pt-4 pl-4 "
                            style={{
                                fontFamily: 'Josefin Sans',
                            }}
                        >
                            Priority
                        </h1>
                        <br />
                        <h1 className="flex pl-20 pr-20 pb-4 justify-between">
                            <span className="bg-cardBullet rounded-3xl w-10 h-10 "></span>
                            <span className="bg-cardBullet rounded-3xl w-10 h-10 "></span>
                            <span className="bg-cardBullet rounded-3xl w-10 h-10 "></span>
                        </h1>
                    </div>
                </div>
                {/* Card item */}
                <div className="md:grid md:grid-rows-2 sm:m-4 md:m-10 rounded-3xl shadow-xl">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="grid grid-cols-2  h-full w-full ">
                            <div className="bg-snow items-center grid grid-rows-2 pl-4 pr-4 pt-2 pb-2 justify-center rounded-tl-3xl">
                                <h2 className="sm:text-sm font-josefin font-bold md:text-lg text-black ">
                                    Math homework
                                </h2>
                                <p className="font-josefin text-sm text-cardBullet">
                                    Difficulty: Hard
                                </p>
                            </div>
                            <div className="bg-snow  w-full items-center justify-center  pl-4 pt-2 pr-4 pb-2 flex rounded-tr-3xl">
                                <div className="inline-block w-full">
                                    <span className="h-6 bg-login rounded-3xl w-full flex"></span>
                                    <p className="font-josefin text-login text-sm flex justify-center items-center pt-2 font-bold">
                                        2 hours
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-jet font-bold bg-card w-full h-full items-center grid grid-rows-2 p-2 rounded-bl-3xl rounded-br-3xl">
                        <h1
                            className="flex text-xl text-josefin pt-4 pl-4 "
                            style={{
                                fontFamily: 'Josefin Sans',
                            }}
                        >
                            Priority
                        </h1>
                        <br />
                        <h1 className="flex pl-20 pr-20 pb-4 justify-between">
                            <span className="bg-cardBullet rounded-3xl w-10 h-10 "></span>
                            <span className="bg-cardBullet rounded-3xl w-10 h-10 "></span>
                            <span className="bg-cardBullet rounded-3xl w-10 h-10 "></span>
                        </h1>
                    </div>
                </div>
                {/* Add button */}
                <div className="flex justify-center items-center sm:m-4 md:m-10 ">
                    <Button
                        onClick={openModal}
                        className="border-2 hover:bg-black"
                    >
                        <AddImg className="h-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Status;
