import React, { useContext, useState, useEffect } from 'react';
import firebaseAuth from '../../firebase';
import 'firebase/firestore';
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    // Connect to cloud firestore
    const ref = firebaseAuth.firestore().collection('answers');

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

    // Get answers
    function getAnswers() {
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            // setAnswers(items)
            return items;
        });
    }

    // Get only items from owner
    function getItems() {
        setLoading(true);
        //orderBy('')
        ref.where('id', '==', currentUser.uid).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            // setItems(items)
            setLoading(false);
            return items;
        });
    }

    // Add answer
    function addAnswer(newAnswer) {
        ref.doc(newAnswer.id)
            .set(newAnswer)
            .catch((err) => {
                console.log(err);
            });
    }

    // Edit answer
    function editAnswer(answer) {
        ref.doc(answer.id)
            .update(answer)
            .catch((err) => {
                console.log(err);
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
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
