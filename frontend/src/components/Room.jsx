import React from 'react'
import { Outlet, Link,useParams, useNavigate } from 'react-router-dom';
import socket from '../socket/index.js';

function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Function to handle exit button click
  const handleExit = () => {
    socket.emit('leave_room', roomId);
    navigate('/'); // Redirect to the homepage or any other route
  };

  return (
    <div className="app-container">
      <header className="mb-6">
        <h1 className="text-xl font-bold mb-2">Room ID: {roomId}</h1>
        <p className="text-gray-600">You are now in a shared room. Use the navigation below to switch between tools.</p>
      </header>

      <div>
        {/* Exit Button */}
      <button 
        onClick={handleExit}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-6"
      >
        Exit Room
      </button>
      </div>

      {/* Navigation Buttons */}
      <nav className="mb-6">
        <Link to={`/room/${roomId}/`}>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Message</button>
        </Link>
        <Link to={`/room/${roomId}/kanban`} className="mr-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Kanban</button>
        </Link>
        <Link to={`/room/${roomId}/text-editor`}>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Text Editor</button>
        </Link>
      </nav>

      {/* Nested Route Content (The default child route will be rendered here) */}
      <div>
        <Outlet /> {/* This will render the appropriate child route */}
      </div>

    </div>
  )
}

export default Room