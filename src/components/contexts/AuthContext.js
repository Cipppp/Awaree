import React, { useContext, useState, useEffect } from 'react';
import firebaseAuth from '../../firebase';
import 'firebase/firestore';
import {
    getDatabase,
    set,
    ref,
    update,
    onValue,
    push,
    query,
    orderByChild,
    child,
    get,
} from 'firebase/database';
import { useHistory } from 'react-router';
import {
    getAuth,
    deleteUser,
    signInWithPopup,
    GithubAuthProvider,
    GoogleAuthProvider,
} from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const history = useHistory();

    //! Connect to cloud firestore
    // const refFirestore = firebaseAuth.firestore().collection('answers');

    const homeworkId = uuidv4();
    const [homeworkValue, setHomeworkValue] = useState([]);
    const [message, setMessage] = useState('');

    //! Connect to realtime database
    const db = getDatabase();

    //! Authentication and user options
    function signup(email, password) {
        return firebaseAuth
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                // ...
            });
    }

    function login(email, password) {
        return firebaseAuth.auth().signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return firebaseAuth.auth().signOut();
    }

    function resetPassword(email) {
        return firebaseAuth.auth().sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser
            .updateEmail(email)
            .then(() => {})
            .catch((error) => {
                console.log(error);
            });
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function deleteUserData() {
        const auth = getAuth();
        const user = auth.currentUser;

        deleteUser(user)
            .then(() => {
                console.log('User deleted.');
            })
            .catch((error) => {
                console.log('There was an error.', error);
                // An error ocurred
                // ...
            });
    }

    function GithubLogin() {
        const provider = new GithubAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                history.push('/status');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function GoogleLogin() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                history.push('/status');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //! Cloud firebase
    // function getAnswers() {
    //     refFirestore.onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    //         // setAnswers(items)
    //         return items;
    //     });
    // }

    // function getItems() {
    //     setLoading(true);
    //orderBy('')
    // refFirestore
    //     .where('id', '==', currentUser.uid)
    //     .onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             items.push(doc.data());
    //         });
    // setItems(items)
    //             setLoading(false);
    //             return items;
    //         });
    // }

    // function addAnswer(newAnswer) {
    //     refFirestore
    //         .doc(newAnswer.id)
    //         .set(newAnswer)
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    // function editAnswer(answer) {
    //     refFirestore
    //         .doc(answer.id)
    //         .update(answer)
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    //! Realtime database
    function updateAnswerData(answer) {
        const db = getDatabase();
        update(ref(db, 'Answers/' + currentUser.uid), answer);
    }
    function writeAnswerData(answer) {
        const db = getDatabase();
        set(ref(db, 'Answers/' + currentUser.uid), answer);
    }

    function writeHomeworkData(homework) {
        const db = getDatabase();

        const homeworkListRef = ref(db, 'Homeworks/' + currentUser.uid);

        const newPostRef = push(homeworkListRef);
        set(newPostRef, homework);
    }

    function writeUserData(username) {
        const db = getDatabase();
        set(ref(db, 'Users/' + currentUser.uid), { username });
    }

    function getUserData() {
        const db = getDatabase();
        const dbRef = ref(db, 'Users/' + currentUser.uid);
        setUsername('');
        onValue(
            dbRef,
            (snapshot) => {
                setUsername(snapshot.val().username);
            },
            {
                onlyOnce: true,
            }
        );
    }

    function displayUserData() {
        const db = getDatabase();
        setHomeworkValue([]);
        const dbRef = query(
            ref(db, 'Homeworks/' + currentUser.uid),
            orderByChild('/priority')
        );

        onValue(
            dbRef,
            (snapshot) => {
                snapshot.forEach((childSnap) => {
                    // for (var key in childSnap.val()) {
                    //     setHomeworkValue([
                    //         ...homeworkValue,
                    //         childSnap.val()[key],
                    setHomeworkValue(childSnap.val());
                    //     ]);
                    // }
                });
            },
            {
                onlyOnce: true,
            }
        );
    }

    // TODO Read homework data
    // ...

    useEffect(() => {
        const unsubscribe = firebaseAuth.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        // getAnswers,
        // addAnswer,
        // editAnswer,
        writeAnswerData,
        updateAnswerData,
        writeUserData,
        writeHomeworkData,
        username,
        GithubLogin,
        GoogleLogin,
        displayUserData,
        deleteUserData,
        homeworkValue,
        getUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
