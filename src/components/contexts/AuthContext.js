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
} from 'firebase/database';
import { useHistory } from 'react-router';
import {
    getAuth,
    deleteUser,
    signInWithPopup,
    GithubAuthProvider,
    GoogleAuthProvider,
} from 'firebase/auth';
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const history = useHistory();
    const [homeworkValue, setHomeworkValue] = useState([]);

    //! Connect to realtime database
    // const db = getDatabase();

    //! Authentication and user options
    function signup(email, password) {
        return firebaseAuth
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {});
    }

    function login(email, password) {
        return firebaseAuth
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {});
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
            .catch((error) => {});
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function deleteUserData() {
        const auth = getAuth();
        const user = auth.currentUser;

        deleteUser(user)
            .then(() => {})
            .catch((error) => {
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
            .catch((error) => {});
    }

    function GoogleLogin() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                history.push('/status');
            })
            .catch((error) => {});
    }

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

    function writeUserData({ username, duration }) {
        const db = getDatabase();
        set(ref(db, 'Users/' + currentUser.uid), { username, duration });
    }

    function updateUserData({ duration }) {
        const db = getDatabase();
        const durationRef = ref(db, 'Users/' + currentUser.uid);
        var homeworkDuration;
        onValue(durationRef, (snapshot) => {
            if (snapshot.exists) {
                homeworkDuration = snapshot.val().duration;
            }
        });
        duration += homeworkDuration;

        update(ref(db, 'Users/' + currentUser.uid), { duration });
    }

    function getUsernameData() {
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
                    setHomeworkValue(childSnap.val());
                });
            },
            {
                onlyOnce: true,
            }
        );
    }

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
        getUsernameData,
        updateUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
