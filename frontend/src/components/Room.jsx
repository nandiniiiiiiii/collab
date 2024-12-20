import React from 'react'
import { Outlet, Link,useParams, useNavigate } from 'react-router-dom';
import socket from '../socket/index.js';
import { MessageSquare, FileText, LogOut, Kanban} from 'lucide-react'

function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Function to handle exit button click
  const handleExit = () => {
    socket.emit('leave_room', roomId);
    navigate('/'); // Redirect to the homepage or any other route
  };

  return (
    <div className="h-screen w-[1250px] bg-green-50 flex items-center justify-center p-4">
      <div className='bg-white min-h-[500px] flex items-center justify-center p-4 flex-col border-2 border-green-200 rounded'>
      <header className="mb-6 flex gap-4 pl-10 pr-10">
        <div>
        <h1 className="text-3xl font-bold text-green-800">Room ID: {roomId}</h1>
        <p className="text-green-700">You are now in a shared room. Use the navigation below to switch between tools.</p>
        </div>
        <div>
        {/* Exit Button */}
      <button 
        onClick={handleExit}
        className="bg-red-500 hover:bg-red-600 w-40 flex items-center justify-center rounded h-8"
        size="sm"
        >
        <LogOut className="mr-2 h-4 w-4" />
        Exit Room
      </button>
      </div>
      </header>

      

      {/* Navigation Buttons */}
      <nav className="flex justify-center space-x-4 pb-4 border-b min-w-[550px] border-green-200 mb-5">
        <Link to={`/room/${roomId}/`}>
          <button className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded flex justify-center items-center">
          <MessageSquare className="mr-2 h-4 w-4" />
            Message</button>
        </Link>
        <Link to={`/room/${roomId}/kanban`} className="mr-4">
          <button className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded flex justify-center items-center">
          <Kanban className="mr-2 h-4 w-4" />
            Kanban</button>
        </Link>
        <Link to={`/room/${roomId}/text-editor`}>
          <button className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded flex justify-center items-center">
          <FileText className="mr-2 h-4 w-4" />
            Text Editor</button>
        </Link>
      </nav>

      {/* Nested Route Content (The default child route will be rendered here) */}
      <div className='bg-white p-4 rounded-lg shadow-inner min-h-[260px] min-w-[550px]'>
        <Outlet /> {/* This will render the appropriate child route */}
      </div>

        </div>
    </div>
  )
}

export default Room