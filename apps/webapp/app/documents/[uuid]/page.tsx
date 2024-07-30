'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

import { DocumentEditor, Header } from './components'
import { connected } from 'process';

interface DocumentPageProps {
    params: {
        uuid: string;
    }
}

export default function DocumentPage({ params: { uuid } }: DocumentPageProps) {
    const server = process.env.NEXT_PUBLIC_API_URL;
    const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
    const [connectedUsers, setConnectedUsers] = useState([]);

    const onConnectedUsers = (data: any) => setConnectedUsers(data.users);
    const onEvent = (data: any) => console.log(data);
    
    async function initSocket() {
        console.log('init socket');
        const token = await getAccessTokenSilently();
        const socket = io(`${server}/editor`, { 
            reconnectionAttempts: 3, 
            auth: { token },
            query: { uuid },
            autoConnect: false
        });
        
        socket.on('user_connected', onConnectedUsers);
        socket.on('disconnect', onEvent);

        socket.connect()
    }

    useEffect(() => {
        if (isLoading || !isAuthenticated) return;
        initSocket();
    }, []);

    return (
        <main className='h-screen'>
            <Header 
                title={"Documento Serio 123.md"} 
                isReadOnly={true} 
                connectedUsers={connectedUsers} 
            />
            <DocumentEditor uuid={uuid} />
        </main>
    );
}

