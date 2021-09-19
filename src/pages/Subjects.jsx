import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function SubjectCard({
    coursesNumber,
    credits,
    isExam,
    labsNumber,
    seminariesNumber,
    subjectCategory,
    subjectName,
}) {
    return (
        <div className="bg-card sm:flex-col md:grid md:grid-rows-2 rounded-3xl shadow-xl m-4 ">
            <div className="w-full h-auto flex items-center justify-center">
                <div className="grid grid-cols-2  h-full w-full place-items-center">
                    <div className="bg-snow items-center pl-4 pr-4 pt-2 pb-2 justify-center flex w-full h-full rounded-tl-3xl">
                        <span className="h-16 w-16 bg-login rounded-3xl  flex  items-center justify-center ml-0">
                            {credits}
                        </span>
                    </div>
                    <div className="bg-snow text-center pt-2 pr-4 pb-2 rounded-tr-3xl w-full h-full flex justify-center items-center">
                        <div className="inline-block w-full">
                            <p className="font-josefin text-jet text-sm flex justify-center items-center pt-2 font-bold">
                                {subjectCategory}
                            </p>
                            <p className="font-josefin text-jet text-sm flex justify-center items-center pt-2 ">
                                {subjectName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`${
                    isExam === 'true'
                        ? 'grid grid-rows-2'
                        : 'flex items-center justify-center'
                } text-jet font-bold bg-card w-full h-auto p-4 rounded-bl-3xl rounded-br-3xl`}
            >
                <div className="flex items-center justify-center">
                    <span
                        className={`${
                            coursesNumber === '0' ? 'hidden' : ''
                        } bg-coursesBullet rounded-3xl w-10 h-10 text-base ml-2 mr-2 flex justify-center items-center text-josefin`}
                    >
                        {coursesNumber}
                    </span>
                    <span
                        className={`${
                            seminariesNumber === '0' ? 'hidden' : ''
                        } bg-seminarsBullet rounded-3xl w-10 h-10 text-base ml-2 mr-2  flex justify-center items-center text-josefin`}
                    >
                        {seminariesNumber}
                    </span>
                    <span
                        className={`${
                            labsNumber === '0' ? 'hidden' : ''
                        } bg-labsBullet rounded-3xl w-10 h-10 text-base ml-2 mr-2  flex justify-center items-center text-josefin`}
                    >
                        {labsNumber}
                    </span>
                </div>
                <div
                    className={`${
                        isExam === 'true' ? '' : 'hidden'
                    } flex  items-center justify-center tracking-wide`}
                >
                    <span
                        className={`${
                            isExam === 'true' ? '' : 'hidden'
                        } h-8 bg-login rounded-3xl w-6/12 flex ml-0 mt-2 items-center justify-center`}
                    >
                        <h1>Exam</h1>
                    </span>
                </div>
            </div>
        </div>
    );
}

function PopulateSubjects() {
    const [detail, setDetail] = useState({});

    useEffect(() => {
        loadSubjects();
    }, []);

    function loadSubjects() {
        const db = getDatabase();
        const subjectsRef = ref(db, 'Specializations/CTI/Anul_1/Semestrul_1');
        onValue(subjectsRef, (snapshot) => {
            setDetail(snapshot.val());
        });
    }
    return (
        <>
            {detail
                ? Object.values(detail).map((key) => (
                      <SubjectCard
                          coursesNumber={key.coursesNumber}
                          credits={key.credits}
                          isExam={key.isExam}
                          labsNumber={key.labsNumber}
                          seminariesNumber={key.seminariesNumber}
                          subjectCategory={key.subjectCategory}
                          subjectName={key.subjectName}
                      />
                  ))
                : null}
        </>
    );
}

function Subjects() {
    return (
        <>
            <div className="bg-snow h-screen overflow-x-hidden overflow-y-auto">
                <div className="bg-snow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-10 w-screen p-6 sm:p-14 md:p-14 pb-6">
                    <PopulateSubjects />
                </div>
            </div>
        </>
    );
}

export default Subjects;
