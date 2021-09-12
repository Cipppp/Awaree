import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { ReactComponent as AddFile } from '../../assets/addFile.svg';
import './Modal.css';
import {
    Background,
    ModalWrapper,
    ModalContent,
    CloseModalButton,
} from '../componentStyles';
import { useAuth, currentUser } from '../contexts/AuthContext';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getMessaging, getToken } from 'firebase/messaging';

export default function Modal({ showModal, setShowModal }) {
    const modalRef = useRef();
    const [classRef, setClassRef] = useState('Mathematics');
    const [difficulty, setDifficulty] = useState('Pice of cake');
    const [priority, setPriority] = useState('Medium');
    const [duration, setDuration] = useState(100);
    const [error, setError] = useState('');
    const { writeHomeworkData, currentUser, displayUserData } = useAuth();
    const [toggle, setToggle] = useState(false);
    const db = getDatabase();
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: 'BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu' })
        .then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
            } else {
                // Show permission request UI
                console.log(
                    'No registration token available. Request permission to generate one.'
                );
                // ...
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });

    const openModal = () => {
        setShowModal((state) => !state);
    };

    const handleOnChange = (e) => {
        setDuration(e.target.value);
        setToggle(true);
    };

    const handleOnBlur = (e) => {
        setToggle(false);
    };

    const animation = useSpring({
        config: {
            duration: 250,
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(-170%)` : `translateY(-200%)`,
    });

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    // Handle escape key pressed
    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setShowModal(false);
            writeHomeworkData({
                // userId: currentUser.uid,
                classRef,
                difficulty,
                priority,
                duration,
            });
            displayUserData();
        } catch {
            setError('Failed to add a homework');
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress]);

    return (
        <>
            {showModal ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showModal}>
                            <AddFile className="w-full h-full p-10" />
                            <ModalContent>
                                <h1 className="text-2xl font-josefin font-bold flex justify-center">
                                    Add new homework:
                                </h1>
                                <form
                                    onSubmit={handleSubmit}
                                    action="submit"
                                    className="w-9/12"
                                >
                                    <h1 className="mt-0">Class</h1>
                                    <select
                                        value={classRef}
                                        onChange={(e) =>
                                            setClassRef(e.target.value)
                                        }
                                    >
                                        <option value="Mathematics">
                                            Mathematics
                                        </option>
                                        <option value="Physics">Physics</option>
                                        <option value="English">English</option>
                                        <option value="C">C</option>
                                    </select>
                                    <h1>Difficulty</h1>
                                    <select
                                        value={difficulty}
                                        onChange={(e) =>
                                            setDifficulty(e.target.value)
                                        }
                                    >
                                        <option value="Pice of cake">
                                            Pice of cake
                                        </option>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                    <h1>Priority</h1>
                                    <select
                                        value={priority}
                                        onChange={(e) =>
                                            setPriority(e.target.value)
                                        }
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                    {/* Start modal */}
                                    <div className="range mt-4 w-full">
                                        <div className="sliderValue">
                                            <span
                                                className={`${
                                                    toggle ? 'show' : ''
                                                }`}
                                                style={{
                                                    left: duration / 4 + '%',
                                                }}
                                            >
                                                {duration}
                                            </span>
                                        </div>
                                        <div className="field">
                                            <div className="value left">0</div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="400"
                                                value={duration}
                                                steps="1"
                                                onChange={handleOnChange}
                                                onBlur={handleOnBlur}
                                            />
                                            <div className="value right">
                                                400
                                            </div>
                                        </div>
                                    </div>
                                    {/* End modal */}

                                    <button className="flex w-4/12 mx-auto justify-center items-center">
                                        Add
                                    </button>
                                    {error && (
                                        <p className="text-white font-josefin">
                                            {error}
                                        </p>
                                    )}
                                </form>
                            </ModalContent>
                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowModal((prev) => !prev)}
                            />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
}
