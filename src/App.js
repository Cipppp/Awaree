import React from 'react';
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
} from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <PrivateRoute path="/settings" component={Settings} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route path="/update-profile" component={UpdateProfile} />
                    <Route path="/register" component={Register} />
                    {/* User can't access this pace if they are logged in */}
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/status" component={Status} />
                    <PrivateRoute path="/intro" component={Intro} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
