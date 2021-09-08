import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function Status() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.pushState('/login');
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="h-screen flex justify-center items-center bg-login">
                    {error && <p>{error}</p>}
                    Welcome back {currentUser.email}
                    <Link to="/update-profile" className="btn">
                        Update profile
                    </Link>
                </div>
                <div className="h-screen flex justify-center items-center bg-login">
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </>
    );
}

export default Status;
