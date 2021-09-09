import React, { useContext, useState, useEffect } from 'react';
import firebaseAuth from '../../firebase';
import 'firebase/firestore';
import { getDatabase, set, ref, update } from 'firebase/database';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    // Connect to cloud firestore
    const refFirestore = firebaseAuth.firestore().collection('answers');
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
        update(ref(db, 'answers/' + currentUser.uid), answer);
    }
    function writeUserData(answer) {
        const db = getDatabase();
        set(ref(db, 'answers/' + currentUser.uid), answer);
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
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
