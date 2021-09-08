import React, { useState, useEffect } from 'react';
import { Home, Navbar, Login, Register, Status } from './components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import './App.css';
import firebaseAuth from './firebase';

function App() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    };

    const handleLogin = () => {
        clearErrors();
        firebaseAuth
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case 'auth/Invalid-email':
                    case 'auth/user-disabled':
                    case 'auth/user-not-found':
                        setEmailError(err.message);
                        break;
                    case 'auth/wrong-password':
                        setPasswordError(err.message);
                        break;
                    default:
                }
            });
    };

    const handleSignup = () => {
        clearErrors();
        firebaseAuth
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                    case 'auth/invalid-email':
                        setEmailError(err.message);
                        break;
                    case 'auth/weak-password':
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const handleLogout = () => {
        firebaseAuth.auth().signOut();
    };

    const authListener = () => {
        firebaseAuth.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser('');
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <Router>
            <Navbar user={user} handleLogout={handleLogout} />
            <Switch>
                <Route path="/register" component={Register} />

                <Route
                    path="/login"
                    render={() =>
                        !user ? (
                            <Login
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                handleLogin={handleLogin}
                                handleSignup={handleSignup}
                                hasAccount={hasAccount}
                                setHasAccount={setHasAccount}
                                emailError={emailError}
                                passwordError={passwordError}
                            />
                        ) : (
                            <Redirect to="/status" />
                        )
                    }
                />

                <Route path="/status">
                    <Status />
                </Route>
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
