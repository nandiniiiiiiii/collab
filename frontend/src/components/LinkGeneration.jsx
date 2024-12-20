import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../socket/index.js';
import { MessageSquare, Users } from 'lucide-react'

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
        <div className="h-100 pb-10 flex pt-10 items-center justify-center">
            <div className="p-10 w-[600px] text-center bg-white border-green-500 border-2 rounded-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-800">Welcome to Collab</h1>
                    <h3 className="text-black">Create a new room or join an existing one</h3>
                </div>

                {/* Room Creation Section */}
                <div>
                    <button
                        onClick={createRoom}
                        className="flex flex-row items-center justify-center w-full h-16 text-lg bg-green-700 hover:bg-green-800 text-white rounded" size="lg"
                    >
                        <MessageSquare className="mr-2 h-6 w-6" />
                        Create a New Room
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

                <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-green-300" />
            </div>
            <div className="relative flex justify-center text-xl uppercase">
              <span className="bg-white px-3 text-green-700 pt-5 pb-5">
                Or
              </span>
            </div>
          </div>

                {/* Join Room via Link */}
                <div className="space-y-2">
                <h3 className="text-s font-bold leading-none text-green-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Join an Existing Room:
            </h3>
                    <input
                        type="text"
                        value={inputRoomId}
                        onChange={(e) => setInputRoomId(e.target.value)}
                        placeholder="Enter Room ID"
                        className="border rounded px-4 py-2 w-full"
                    />
                    <button
                        onClick={() => joinRoom(inputRoomId)}
                        className="bg-green-700 hover:bg-green-800 text-white hover:bg-purple-600 text-white px-4 py-2 rounded mt-2 w-full"
                    >
                        Join Room
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LinkGeneration