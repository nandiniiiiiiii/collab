import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket/index.js';

function LinkGeneration() {
    const [roomId, setRoomId] = useState('');
    const [inputRoomId, setInputRoomId] = useState(''); // State for the input room ID
    const navigate = useNavigate();

    // Function to create a room
    const createRoom = () => {
        console.log("create room")
        socket.emit('create_room', (generatedRoomId) => {
            setRoomId(generatedRoomId); // Set the room ID locally
        });
    };

    // Navigate to the room-specific page
    const joinRoom = (roomId) => {
        if (roomId) {
            console.log(`Joining room: ${roomId}`);
            socket.emit('join_room', roomId); // Emit join_room with the roomId
            navigate(`/room/${roomId}`)
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to the Collaboration App</h1>


            {/* Room Creation Section */}
            <div>
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
                        onClick={() => joinRoom(roomId)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
                        >
                        Go to Room
                    </button>
                </div>
            )}
            </div>

            {/* Join Room via Link */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Join a Room</h2>
                <input
                    type="text"
                    value={inputRoomId}
                    onChange={(e) => setInputRoomId(e.target.value)}
                    placeholder="Enter Room ID"
                    className="border rounded px-4 py-2 w-full"
                />
                <button
                    onClick={() => joinRoom(inputRoomId)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded mt-2 w-full"
                >
                    Join Room
                </button>
            </div>

        </div>
    )
}

export default LinkGeneration