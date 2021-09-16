import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import { Modal } from '../index';
import { Button } from '../componentStyles';
import { ReactComponent as AddImg } from '../../assets/plus.svg';

function HomeworkCard({ classRef, difficulty, priority, duration }) {
    const minutes = duration - 60 * Math.floor(duration / 60);

    const hours = Math.floor(duration / 60);
    const [difficultyVeryEasy, setDifficultyVeryEasy] = useState(false);
    const [difficultyEasy, setDifficultyEasy] = useState(false);
    const [difficultyMedium, setDifficultyMedium] = useState(false);
    const [difficultyHard, setDifficultyHard] = useState(false);

    const checkDifficulty = () => {
        if (duration <= 30) {
            setDifficultyVeryEasy(true);
        } else if (duration <= 90) {
            setDifficultyEasy(true);
        } else if (duration > 90 && duration <= 180) {
            setDifficultyMedium(true);
        } else if (duration > 180) {
            setDifficultyHard(true);
        }
    };

    useEffect(() => {
        checkDifficulty();
    });

    return (
        <div className="sm:flex-col md:grid md:grid-rows-2 sm:m-4 md:m-10 rounded-3xl shadow-xl">
            <div className="w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-2  h-full w-full place-items-center">
                    <div className="bg-snow items-center grid grid-rows-2 pl-4 pr-4 pt-2 pb-2 justify-center place-items-center rounded-tl-3xl">
                        <h2 className="text-center sm:text-sm font-josefin font-bold md:text-lg text-black ">
                            {classRef} homework
                        </h2>
                        <p
                            className={`${
                                difficulty === 'Pice of cake'
                                    ? 'text-veryEasy'
                                    : difficulty === 'Easy'
                                    ? 'text-easy'
                                    : difficulty === 'Medium'
                                    ? 'text-medium'
                                    : difficulty === 'Hard'
                                    ? 'text-hard'
                                    : ''
                            } font-josefin text-sm font-bold pb-4`}
                        >
                            Difficulty: {difficulty}
                        </p>
                    </div>
                    <div className="bg-snow  w-full items-center justify-center  pl-4 pt-2 pr-4 pb-2 flex rounded-tr-3xl">
                        <div className="inline-block w-full">
                            <span
                                className={`${
                                    difficultyVeryEasy
                                        ? 'bg-veryEasy'
                                        : difficultyEasy
                                        ? 'bg-easy'
                                        : difficultyMedium
                                        ? 'bg-medium'
                                        : difficultyHard
                                        ? 'bg-hard'
                                        : ''
                                } h-6 rounded-3xl w-full flex ml-0`}
                            ></span>
                            <p
                                className={`${
                                    difficultyVeryEasy
                                        ? 'text-veryEasy'
                                        : difficultyEasy
                                        ? 'text-easy'
                                        : difficultyMedium
                                        ? 'text-medium'
                                        : difficultyHard
                                        ? 'text-hard'
                                        : ''
                                } font-josefin text-sm flex justify-center items-center pt-2 font-bold`}
                            >
                                {duration / 60 < 1
                                    ? `${duration} minutes`
                                    : hours < 2
                                    ? `${hours} hour ${
                                          minutes > 0
                                              ? `${minutes} minutes`
                                              : ''
                                      }`
                                    : `${hours} hours ${
                                          minutes > 0
                                              ? `${minutes} minutes`
                                              : ''
                                      }`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-jet font-bold bg-card w-full h-full items-center grid grid-rows-2 rounded-bl-3xl rounded-br-3xl">
                <h1
                    className="flex text-xl text-josefin  pl-8 "
                    style={{
                        fontFamily: 'Josefin Sans',
                    }}
                >
                    Priority
                </h1>
                <h1 className="flex pl-20 pr-20 pb-4 justify-between">
                    <span
                        className={`${
                            priority === 'Low' ? 'bg-easy' : 'bg-cardBullet'
                        } rounded-3xl w-10 h-10 text-base flex justify-center items-center text-josefin`}
                    >
                        L
                    </span>
                    <span
                        className={`${
                            priority === 'Medium'
                                ? 'bg-medium'
                                : 'bg-cardBullet'
                        } rounded-3xl w-10 h-10 text-base flex justify-center items-center text-josefin`}
                    >
                        M
                    </span>
                    <span
                        className={`${
                            priority === 'High' ? 'bg-hard' : 'bg-cardBullet'
                        } rounded-3xl w-10 h-10 text-base flex justify-center items-center text-josefin`}
                    >
                        H
                    </span>
                </h1>
            </div>
        </div>
    );
}

function PopulateGroups() {
    const { currentUser } = useAuth();
    const [detail, setDetail] = useState({});

    useEffect(() => {
        loadGroups();
    }, []);

    function loadGroups() {
        const db = getDatabase();
        const homeworkRef = ref(db, 'Homeworks/' + currentUser.uid);
        onValue(homeworkRef, (snapshot) => {
            setDetail(snapshot.val());
        });
    }
    return (
        <>
            {detail
                ? Object.values(detail).map((key) => (
                      <HomeworkCard
                          classRef={key.classRef}
                          difficulty={key.difficulty}
                          priority={key.priority}
                          duration={key.duration}
                      />
                  ))
                : null}
        </>
    );
}

function Homeworks() {
    const [value, setValue] = useState(100);
    const [showModal, setShowModal] = useState(false);
    const [toggle, setToggle] = useState(false);
    const { currentUser, homeworkValue } = useAuth();

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
        <>
            <div className="bg-snow h-screen overflow-x-hidden overflow-y-auto">
                <Modal showModal={showModal} setShowModal={setShowModal} />
                <div className="bg-snow sm:grid-cols-1  grid md:grid-cols-3 w-screen p-20 pb-6">
                    <PopulateGroups />
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
        </>
    );
}

export default Homeworks;
