'user client';

import { User } from '@/openapi';
import React from 'react';
import { Socket } from 'socket.io-client';

type ConnectedUser = {
    permission: "write" | "read";
    pointer: number;
    selectedText: number;
    socketId: string;
    color: string
    user: User;
};

type HeaderProps = {
    title: string;
    socket: Socket;
    connectedUsers: ConnectedUser[];
    isReadOnly: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, connectedUsers, isReadOnly }) => {
    const handlePermissionChange = (userId: string, newPermission: string) => {
    };

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center gap-2">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{title}</span>
                        { isReadOnly && <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Sola Lettura</span> }
                    </div>
                    <div className="flex items-center lg:order-2 gap-2">
                        <span className="text-sm font-medium dark:text-gray-300">
                            Connessi: {connectedUsers.length}
                        </span>
                        <div className="flex -space-x-4 rtl:space-x-reverse">
                            {connectedUsers.map(({user, color}) => (
                                <img 
                                    key={"permission-usr-"+Math.random()}
                                    className={`w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 p-0.5`}
                                    style={{ backgroundColor: color }}
                                    src={user.picture} 
                                    alt={user.name}
                                    referrerPolicy="no-referrer"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export {
    Header
};