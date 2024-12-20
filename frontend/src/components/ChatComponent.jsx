// ChatComponent.jsx
import React, { useState, useEffect } from 'react';
import socket from '../socket/index.js';
import { useParams } from 'react-router-dom';
import { Send, User } from 'lucide-react'

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams(); // Get roomId from URL

  // Listen for incoming messages
  // Persist messages in localStorage
  useEffect(() => {
    // Retrieve messages from localStorage for the current roomId
    const storedMessages = JSON.parse(localStorage.getItem(roomId)) || [];
    setMessages(storedMessages);

    // Listen for incoming messages
    socket.on('receive_message', (msg) => {
      console.log('New message:', msg);

      // Update the messages state with the new message
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, msg];

        // Save the updated messages in localStorage
        localStorage.setItem(roomId, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    });

    // Cleanup on component unmount
    return () => {
      socket.off('receive_message'); // Remove event listener
    };
  }, [roomId]); // This will re-run when roomId changes

  useEffect(() => {
    console.log('Updated messages:', messages);
  }, [messages]);

  // Send message to the server
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { roomId, msg: message }); // Emit message to the server with roomId
      console.log(message)
      setMessage(''); // Clear the message input field
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto flex flex-col'>
      <div className="text-white rounded-t-lg mb-5">
        <h1 className='text-2xl font-bold text-green-700'>Chat Room</h1>
      </div>
      <div className="flex-grow mb-4 min-h-[100px]">
        {messages.map((msg, index) => (
          <div className='flex mb-4' key={index}>{msg}</div>
        ))}
      </div>
      <div className="flex space-x-2 mt-5">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow border-green-400 border-green-600 focus:ring-green-500"
        placeholder="Type your message..."
      />
        <button
          onClick={sendMessage}
          className='bg-green-700 hover:bg-green-800 text-whitebg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded flex justify-center items-center'
        >
          <Send className="mr-2 h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
