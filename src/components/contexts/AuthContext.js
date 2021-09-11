import React, { useContext, useState, useEffect } from 'react';
import firebaseAuth from '../../firebase';
import 'firebase/firestore';
import { getDatabase, set, ref, update, onValue } from 'firebase/database';
import { useHistory } from 'react-router';
import {
    getAuth,
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
    const history = useHistory();
    // Connect to cloud firestore
    const refFirestore = firebaseAuth.firestore().collection('answers');
    const homeworkdId = uuidv4();
    const [dbHomeworkClass, setDbHomeworkClass] = useState('');
    const [dbDifficulty, setDbDifficulty] = useState('');
    const [dbPriority, setDbPriority] = useState('');
    const [dbDuration, setDbDuration] = useState(0);

    // Connect to realtime database
    const db = getDatabase();

    function signup(email, password) {
        return firebaseAuth
            .auth()
            .createUserWithEmailAndPassword(email, password);
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
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
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

    // #### Cloud firebase ####
    function getAnswers() {
        refFirestore.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            // setAnswers(items)
            return items;
        });
    }

    function getItems() {
        setLoading(true);
        //orderBy('')
        refFirestore
            .where('id', '==', currentUser.uid)
            .onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                });
                // setItems(items)
                setLoading(false);
                return items;
            });
    }

    function addAnswer(newAnswer) {
        refFirestore
            .doc(newAnswer.id)
            .set(newAnswer)
            .catch((err) => {
                console.log(err);
            });
    }

    function editAnswer(answer) {
        refFirestore
            .doc(answer.id)
            .update(answer)
            .catch((err) => {
                console.log(err);
            });
    }

    // #### Realtime database ####
    function updateUserData(answer) {
        const db = getDatabase();
        update(ref(db, 'Answers/' + currentUser.uid), answer);
    }
    function writeUserData(answer) {
        const db = getDatabase();
        set(ref(db, 'Answers/' + currentUser.uid), answer);
    }

    function writeHomeworkData(homework) {
        const db = getDatabase();
        set(ref(db, 'Homeworks/' + homeworkdId), homework);

        // setTimeout(() => {
        //     displayUserData();
        // }, 10000);
    }

    function displayUserData() {
        const db = getDatabase();
        const classRefDb = ref(db, 'Homeworks/' + homeworkdId + '/classRef');
        const difficultyRefDb = ref(
            db,
            'Homeworks/' + homeworkdId + '/difficulty'
        );
        const durrationRefDb = ref(
            db,
            'Homeworks/' + homeworkdId + '/duration'
        );
        const priorityRefDb = ref(db, 'Homeworks/' + homeworkdId + '/priority');
        onValue(classRefDb, (snapshot) => {
            setDbHomeworkClass(snapshot.val());
            console.log(dbHomeworkClass);
        });

        onValue(difficultyRefDb, (snapshot) => {
            setDbDifficulty(snapshot.val());
            console.log(dbDifficulty);
        });

        onValue(priorityRefDb, (snapshot) => {
            setDbPriority(snapshot.val());
            console.log(dbPriority);
        });

        onValue(durrationRefDb, (snapshot) => {
            setDbDuration(snapshot.val());
            console.log(dbDuration);
        });
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
        getAnswers,
        addAnswer,
        editAnswer,
        writeUserData,
        updateUserData,
        writeHomeworkData,
        GithubLogin,
        GoogleLogin,
        dbHomeworkClass,
        displayUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
