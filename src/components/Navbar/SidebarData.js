import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as SiIcons from 'react-icons/si';
import * as FiIcons from 'react-icons/fi';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: 'Status',
        path: '/status',
        icon: <IoIcons.IoIosStats />,
        cName: 'nav-text',
    },

    {
        title: 'Homeworks',
        path: '/homeworks',
        icon: <MdIcons.MdWork />,
        cName: 'nav-text',
    },
    {
        title: 'Subjects',
        path: '/subjects',
        icon: <SiIcons.SiGoogleclassroom />,
        cName: 'nav-text',
    },

    {
        title: 'Settings',
        path: '/settings',
        icon: <FiIcons.FiSettings />,
        cName: 'nav-text',
    },
];
