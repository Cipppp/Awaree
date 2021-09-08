import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Settings() {
    const history = useHistory();
    const { logout } = useAuth();
    const [error, setError] = useState('');

    const routeChangeUpdate = () => {
        let path = '/update-profile';
        history.push(path);
    };
    const routeChangeOut = () => {
        let path = '/login';
        history.push(path);
    };

    async function handleLogout() {
        setError('');
        try {
            await logout();
            history.pushState('/login');
        } catch {
            setError('Failed to log out.');
        }
    }

    return (
        <>
            <div className="grid grid-rows-6 h-screen bg-form">
                <div className="row-span-3 flex justify-center items-end h-full">
                    <button
                        className="btn-auth hover:bg-jet hover:text-link focus:outline-none"
                        onClick={routeChangeUpdate}
                    >
                        Update profile
                    </button>
                </div>
                <div
                    className="row-span-3 flex justify-center items-start h-full"
                    onClick={handleLogout}
                >
                    <button className="btn-auth hover:bg-jet hover:text-link focus:outline-none">
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
}

export default Settings;
