import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function LinkGeneration() {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    // Function to create a room
    const createRoom = () => {
        console.log("create room")
        socket.emit('create_room', (generatedRoomId) => {
            setRoomId(generatedRoomId); // Set the room ID locally
        });
    };

    // Navigate to the room-specific page
    const joinRoom = () => {
        if (roomId) navigate(`/room/${roomId}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to the Collaboration App</h1>

            {/* Room Creation Section */}
            <button
                onClick={createRoom}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
                Create Room
            </button>

            {/* Display Room Link */}
            {roomId && (
                <div className="mt-4">
                    <p>Share this link to join the room:</p>
                    <p className="font-mono text-blue-500">{`http://localhost:5173/room/${roomId}`}</p>
                    <button
                        onClick={joinRoom}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
                    >
                        Go to Room
                    </button>
                </div>
            )}
        </div>
    )
}

export default LinkGeneration