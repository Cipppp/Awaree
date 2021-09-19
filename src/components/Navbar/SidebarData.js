import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { IoIosStats } from 'react-icons/io';
import { MdWork } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { FiSettings } from 'react-icons/fi';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'Status',
        path: '/status',
        icon: <IoIosStats />,
        cName: 'nav-text',
    },

    {
        title: 'Homeworks',
        path: '/homeworks',
        icon: <MdWork />,
        cName: 'nav-text',
    },
    {
        title: 'Subjects',
        path: '/subjects',
        icon: <SiGoogleclassroom />,
        cName: 'nav-text',
    },

    {
        title: 'Settings',
        path: '/settings',
        icon: <FiSettings />,
        cName: 'nav-text',
    },
];
