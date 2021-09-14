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
    PageNotFound,
} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { getMessaging, getToken } from 'firebase/messaging';
import { ToastContainer, toast } from 'react-toastify';

const contextClass = {
    success: 'bg-green-600 pt-4 pb-4',
    error: 'bg-red-600',
    info: 'bg-gray-600',
    warning: 'bg-orange-400',
    default: 'bg-indigo-600',
    dark: 'bg-white-600 font-gray-300',
};
function App() {
    const [loading, setLoading] = useState(true);

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
                        <PrivateRoute
                            exact
                            path="/settings"
                            component={Settings}
                        />
                        <Route
                            exact
                            path="/forgot-password"
                            component={ForgotPassword}
                        />
                        <Route
                            exact
                            path="/update-profile"
                            component={UpdateProfile}
                        />
                        <Route exact path="/register" component={Register} />
                        {/* User can't access this pace if they are logged in */}
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/status" component={Status} />
                        <PrivateRoute exact path="/intro" component={Intro} />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </AuthProvider>
            )}
            <ToastContainer
                style={{ fontFamily: 'Josefin Sans' }}
                limit={1}
                position="top-center"
                autoClose={1200}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                toastClassName={({ type }) =>
                    contextClass[type || 'default'] +
                    ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
                }
            />
        </Router>
    );
}

export default App;
