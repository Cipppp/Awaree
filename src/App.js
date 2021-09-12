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

function App() {
    const [loading, setLoading] = useState(true);

    // function displayWebsite() {
    //     try {
    //         setLoading(true);
    //         console.log('#2 Loading: ', loading);
    //     } catch {}

    //     console.log('#3 Loading: ', loading);
    // }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 700);
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
