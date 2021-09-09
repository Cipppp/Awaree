import React, { useState } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import firebaseAuth from '../../firebase';
import { getDatabase, ref, set } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';

const QuestionSection = ({ rightSection, text, id, done }) => {
    const [answer, setAnswer] = useState('');
    const { currentUser } = useAuth();
    var profileRef = '';
    var seriesRef = '';
    var groupRef = '';
    var activitiesRef = '';
    var userId = id;

    const handleOnChange = (e) => {
        setAnswer(e.target.value);
    };

    const keyPressed = ({ key }) => {
        // Capture answer on Enter key
        if (key === 'Enter') {
            handleClick();
        }
    };

    function writeUserData(
        userId,
        profileRef,
        seriesRef,
        groupRef,
        activitiesRef
    ) {
        const db = getDatabase();
        console.log(userId);
        console.log(parseInt(userId));
        set(ref(db, 'Answers/' + parseInt(userId)), {
            profile: 'CTI',
            series: 'CC',
            group: '313',
            activities: 'Yes',
        });
    }

    const handleClick = () => {
        // Save search term state to React Hooks
        console.log(id);
        if (id === 1) {
            profileRef = answer;
            console.log(profileRef);
        } else if (id === 2) {
            seriesRef = answer;
            console.log(seriesRef);
        } else if (id === 3) {
            groupRef = answer;
            console.log(groupRef);
        } else if (id === 4) {
            activitiesRef = answer;
            console.log(activitiesRef);
        }
        scrollTo('#quiz_' + (id + 1));
    };

    const createAnswer = () => {
        // const answerRef = firebaseAuth.database().ref('Answers');
        // const item = {
        //     answer,
        // };
        // answerRef.push(item);
    };

    return (
        <>
            {console.log(currentUser.uid)}
            <div className="grid grid-cols-2" id={`quiz_${id}`}>
                <div
                    className={`h-screen flex justify-center items-center bg-login ${
                        rightSection ? 'order-last' : ''
                    }`}
                >
                    <div className="container w-7/12 ">
                        <input
                            type="text"
                            required
                            className="w-full p-5 focus:outline-none focus:shadow-outline rounded-full"
                            onChange={handleOnChange}
                            onKeyPress={keyPressed}
                        />

                        {done ? (
                            <button
                                className="btn-auth hover:bg-green-300 hover:text-white focus:outline-none"
                                onClick={writeUserData(
                                    userId,
                                    profileRef,
                                    seriesRef,
                                    groupRef,
                                    activitiesRef
                                )}
                            >
                                Done
                            </button>
                        ) : (
                            <button
                                className="btn-auth hover:bg-jet hover:text-link focus:outline-none"
                                onClick={handleClick}
                            >
                                Continue
                            </button>
                        )}
                    </div>
                </div>
                <div className="h-screen flex justify-center items-center bg-snow font-josefin text-2xl">
                    {text}
                </div>
            </div>
        </>
    );
};

export default QuestionSection;
