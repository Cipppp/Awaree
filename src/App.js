import React, { useState, useEffect } from 'react';
import {
    Home,
    Navbar,
    Login,
    Register,
    Status,
    Intro,
    ForgotPassword,
    UpdateProfile,
    Settings,
    ProgressBar,
} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { getMessaging, getToken } from 'firebase/messaging';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 700);

        // const messaging = getMessaging();
        // getToken(messaging, {
        //     vapidKey:
        //         'BB9lr_QIBXSjqXqmk7jhS7Fg7S__31Q2QVl4KYxdf88a7Xjks7vNZGSyqkpQuLms0OJpfQ-T9JZb40h5s5zY0uc',
        // })
        //     .then((currentToken) => {
        //         if (currentToken) {
        //             console.log('Token: ', currentToken);
        //             // ...
        //         } else {
        //             // ...
        //         }
        //     })
        //     .catch((err) => {
        //         console.log('An error occurred while retrieving token. ', err);
        //     });
    }, []);

    return (
        <Router>
            {loading ? (
                <div className="flex items-center justify-center">
                    <ProgressBar done={100} className="shadow-md" />
                </div>
            ) : (
                <AuthProvider>
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <PrivateRoute path="/settings" component={Settings} />
                        <Route
                            path="/forgot-password"
                            component={ForgotPassword}
                        />
                        <Route
                            path="/update-profile"
                            component={UpdateProfile}
                        />
                        <Route path="/register" component={Register} />
                        {/* User can't access this pace if they are logged in */}
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/status" component={Status} />
                        <PrivateRoute path="/intro" component={Intro} />
                    </Switch>
                </AuthProvider>
            )}
        </Router>
    );
}

export default App;
