// ChatComponent.jsx
import React, { useState, useEffect } from 'react';
import socket from '../socket/index.js';
import { useParams } from 'react-router-dom';

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
    <div>
      <div>
        <h1>Message here</h1>
        {messages.map((msg, index) => (
          <div className='black-900' key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
