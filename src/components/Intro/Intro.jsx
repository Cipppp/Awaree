import React from 'react';
import { question_1, question_2, question_3, question_4 } from '../Data';
import { QuestionSection } from '../index.js';

function Intro() {
    return (
        <>
            <QuestionSection {...question_1} />
            <QuestionSection {...question_2} />
            <QuestionSection {...question_3} />
            <QuestionSection {...question_4} />
        </>
    );
}

export default Intro;
