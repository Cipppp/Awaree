import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as Falcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData.js';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';

import { getDatabase, ref, onValue } from 'firebase/database';

function Navbar() {
    const [error, setError] = useState('');
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const { currentUser, logout, getUserData } = useAuth();
    const history = useHistory();
    const isOnPage = history.location.pathname === '/login';

    const [username, setUsername] = useState('Loading...');

    useEffect(() => {
        if (!currentUser) {
            Redirect('/login');
        } else {
            const db = getDatabase();
            const usernameRef = ref(db, 'Users/' + currentUser.uid);
            onValue(usernameRef, (snapshot) => {
                const data = snapshot.val().username;
                setUsername(data);
            });
        }
    }, []);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                {currentUser ? (
                    <div className="navbar flex justify-between pl-10 pr-10 shadow-xs">
                        <Link
                            to="/"
                            className="text-white font-josefin text-3xl flex justify-"
                        >
                            Awaree.
                        </Link>

                        <h1 className="text-lg text-white">{username}</h1>
                        <Link to="#" className="menu-bars">
                            <Falcons.FaBars onClick={showSidebar} />
                        </Link>

                        <nav
                            className={sidebar ? 'nav-menu active' : 'nav-menu'}
                        >
                            <ul
                                className="nav-menu-items"
                                onClick={showSidebar}
                            >
                                <ul className="menu-items">
                                    <li className="navbar-toggle">
                                        <Link to="#" className="menu-bars">
                                            <AiIcons.AiOutlineClose className="mt-10" />
                                        </Link>
                                    </li>

                                    {SidebarData.map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={item.cName}
                                            >
                                                <Link to={item.path}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </ul>
                        </nav>
                    </div>
                ) : (
                    <div className="navbar flex justify-between pl-10 pr-10 shadow-xs">
                        <Link
                            to="/"
                            className="text-white font-josefin text-3xl"
                        >
                            Awaree.
                        </Link>
                        <Link
                            to="/login"
                            className="text-white font-josefin text-xl"
                        >
                            Log In
                        </Link>
                    </div>
                )}
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
