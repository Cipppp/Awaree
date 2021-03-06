import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { SidebarData } from './SidebarData.js';
import './Navbar.css';
import { IconContext } from 'react-icons/lib';
import { FiLogOut } from 'react-icons/fi';
import { getDatabase, ref, onValue } from 'firebase/database';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const [username, setUsername] = useState('');

    const check = () => {
        if (!currentUser) {
            Redirect('/login');
        } else {
            try {
                const db = getDatabase();
                const usernameRef = ref(db, 'Users/' + currentUser.uid);
                onValue(usernameRef, (snapshot) => {
                    try {
                        const data = snapshot.val().username;
                        setUsername(data);
                    } catch {
                        history.push('/login');
                    }
                });
            } catch {
                logout();
                Redirect('/login');
            }
        }
    };

    useEffect(() => {
        check();
    }, []);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                {currentUser ? (
                    <div className="navbar flex justify-between pl-10 pr-10 shadow-xs">
                        <Link
                            to="/Awaree"
                            className="text-white font-bold font-josefin text-3xl flex justify-"
                        >
                            Awaree.
                        </Link>

                        <h1 className="text-lg text-white mr-20">{username}</h1>
                        <Link to="#" className="menu-bars">
                            <FaBars onClick={showSidebar} />
                        </Link>

                        <nav
                            className={
                                sidebar ? 'nav-menu active ' : 'nav-menu'
                            }
                        >
                            <ul
                                className="nav-menu-items"
                                onClick={showSidebar}
                            >
                                <li className="navbar-toggle ">
                                    <Link to="#" className="menu-bars ml-6">
                                        <AiOutlineClose className="mt-10" />
                                    </Link>
                                </li>
                                {SidebarData.map((item, index) => {
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link
                                                to={item.path}
                                                className="flex items-center justify-center"
                                            >
                                                {item.icon}
                                                <span className="nav-span">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                                <li className="nav-text">
                                    <Link
                                        to="/Awaree"
                                        onClick={logout}
                                        className="flex items-center justify-center text-white"
                                    >
                                        <FiLogOut />
                                        <span className="nav-span">
                                            Log out
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                ) : (
                    <div className="navbar flex justify-between pl-10 pr-10 shadow-xs">
                        <Link
                            to="/Awaree"
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
