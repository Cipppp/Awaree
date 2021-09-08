import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import firebase from '../../firebase';

function Status() {
    const { currentUser } = useAuth();
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = firebase.database().ref('Answers');
    function getAnswers() {
        ref.on('value', (snapshot) => {
            let answerList = [];
            snapshot.forEach((snap) => {
                answerList.push(snap.val());
            });
            setAnswers(answerList);
        });
    }

    useEffect(() => {
        getAnswers();
    }, []);

    // const ref = firebase.firestore().collection('answers');

    // function getAnswers() {
    //     setLoading(true);
    //     ref.onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    //         setAnswers(items);
    //         setLoading(false);
    //     });
    // }

    // useEffect(() => {
    //     getAnswers();
    // }, []);

    // if (loading) {
    //     return <h1>Loading...</h1>;
    // }

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="h-screen flex justify-center items-center bg-login col-span-2">
                    {/* {answers.map((answer) => (
                        <div key={answer.id}>
                            <h2>{answer.profile}</h2>
                            <h2>{answer.series}</h2>
                            <h2>{answer.group}</h2>
                            <h2>{answer.volunteer_activities}</h2>
                        </div>
                    ))} */}

                    {answers.map((answer) => {
                        return (
                            <div key={answer.id}>
                                <h2>{answer.profile}</h2>
                                <h2>{answer.series}</h2>
                                <h2>{answer.group}</h2>
                                <h2>{answer.volunteer_activities}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Status;
