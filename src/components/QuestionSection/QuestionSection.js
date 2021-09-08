import React, { useState } from 'react';
import firebaseAuth from '../../firebase';
import scrollTo from 'gatsby-plugin-smoothscroll';

const QuestionSection = ({ rightSection, text, id, done }) => {
    const [answer, setAnswer] = useState('');

    const handleOnChange = (e) => {
        setAnswer(e.target.value);
    };

    const createAnswer = () => {
        scrollTo('#quiz_' + (id + 1));
        const answerRef = firebaseAuth.database().ref('Answers');
        const item = {
            answer,
        };

        answerRef.push(item);
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
                            className="w-full p-5 focus:outline-none focus:shadow-outline rounded-full"
                            onChange={handleOnChange}
                        />

                        {done ? (
                            <button
                                className="btn-auth hover:bg-green-300 hover:text-white focus:outline-none"
                                onClick={createAnswer}
                            >
                                Done
                            </button>
                        ) : (
                            <button
                                className="btn-auth hover:bg-jet hover:text-link focus:outline-none"
                                onClick={createAnswer}
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
