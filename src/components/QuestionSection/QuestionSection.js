import React, { useEffect, useState } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const QuestionSection = ({ rightSection, text, id, done }) => {
    const [profile, setProfile] = useState(0);
    const [series, setSeries] = useState(0);
    const [group, setGroup] = useState(0);
    const [activities, setActivities] = useState(0);
    const { currentUser, addAnswer, editAnswer } = useAuth();
    const history = useHistory();
    const userId = currentUser.uid;

    const keyPressed = ({ key }) => {
        // Capture answer on Enter key
        if (key === 'Enter') {
            handleClick();
        }
    };

    const handleClick = () => {
        scrollTo('#quiz_' + (id + 1));
        switch (id) {
            case 1:
                addAnswer({ profile, id: userId });
                break;
            case 2:
                editAnswer({ series, id: userId });
                break;
            case 3:
                editAnswer({ group, id: userId });
                break;
            case 4:
                editAnswer({ activities, id: userId });
                break;
            default:
                break;
        }
    };

    const handleDone = () => {
        history.push('/status');
    };

    const handleOnChange = (e) => {
        console.log('Value = ' + id);

        switch (id) {
            case 1:
                setProfile(e.target.value);
                break;
            case 2:
                setSeries(e.target.value);
                break;
            case 3:
                setGroup(e.target.value);
                break;
            case 4:
                setActivities(e.target.value);
                break;
            default:
                break;
        }
    };

    return (
        <>
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
                            className="w-full p-5 focus:outline-none font-bold tracking-wider rounded-full bg-form focus:border-snow text-xl border-4 border-jet"
                            onChange={handleOnChange}
                            onKeyPress={keyPressed}
                        />

                        {done ? (
                            <button
                                className="btn-auth hover:bg-green-300 hover:text-white focus:outline-none"
                                onClick={handleDone}
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
