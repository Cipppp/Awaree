import React, { useState } from 'react';
import firebaseAuth from '../../firebase';

const QuestionSection = ({ rightSection, text }) => {
    const [answer, setAnswer] = useState('');

    const handleOnChange = (e) => {
        setAnswer(e.target.value);
    };

    const createAnswer = () => {
        const answerRef = firebaseAuth.database().ref('Answers');
        const item = {
            answer,
        };

        answerRef.push(item);
    };
    return (
        <>
            <div className="grid grid-cols-2">
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
                        />
                        <button
                            className="btn-auth hover:bg-jet hover:text-link"
                            onClick={createAnswer}
                        >
                            Continue
                        </button>
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
