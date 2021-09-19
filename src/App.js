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
    Homeworks,
    Subjects,
} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop';

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
                    <ScrollToTop />
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <PrivateRoute
                            path="/settings"
                            exact
                            component={Settings}
                        />
                        <PrivateRoute
                            path="/homeworks"
                            exact
                            component={Homeworks}
                        />
                        <PrivateRoute
                            path="/subjects"
                            exact
                            component={Subjects}
                        />
                        <Route
                            path="/forgot-password"
                            exact
                            component={ForgotPassword}
                        />
                        <Route
                            path="/update-profile"
                            exact
                            component={UpdateProfile}
                        />
                        <Route path="/register" exact component={Register} />
                        {/* User can't access this pace if they are logged in */}
                        <Route path="/login" exact component={Login} />
                        <PrivateRoute path="/status" exact component={Status} />
                        <PrivateRoute path="/intro" exact component={Intro} />
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
