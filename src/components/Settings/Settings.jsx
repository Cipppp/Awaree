import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Settings() {
    const history = useHistory();
    const { logout, deleteUserData } = useAuth();
    const [error, setError] = useState('');

    const routeChangeUpdate = () => {
        let path = '/update-profile';
        history.push(path);
    };

    async function handleLogout() {
        setError('');
        try {
            await logout();
        } catch {
            setError('Failed to log out.');
        }
    }

    return (
        <>
            <div className="grid grid-rows-9 h-screen bg-snow">
                <div className="row-span-3 flex justify-center items-end h-full">
                    <button
                        className="btn-auth hover:bg-jet hover:text-snow focus:outline-none"
                        onClick={routeChangeUpdate}
                    >
                        Update profile
                    </button>
                </div>
                <div className="row-span-3 flex justify-center items-center h-full">
                    <button
                        className="btn-auth hover:bg-red-700 hover:text-snow hover:border-red-700 focus:outline-none"
                        onClick={deleteUserData}
                    >
                        Delete user
                    </button>
                </div>
                <div className="row-span-3 flex justify-center items-start h-full">
                    <button
                        className="btn-auth hover:bg-jet hover:text-snow focus:outline-none"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
}

export default Settings;
