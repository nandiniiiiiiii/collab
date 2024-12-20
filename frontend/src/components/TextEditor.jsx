import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // for snow theme
import socket from '../socket/index.js';
import { useParams } from 'react-router-dom';

function TextEditor() {
    const [editorContent, setEditorContent] = useState('');
    const { roomId } = useParams(); // Get roomId from URL

  // Load saved content from local storage when the component mounts
  useEffect(() => {
    const savedContent = localStorage.getItem(`editorContent_${roomId}`);
    if (savedContent) {
      setEditorContent(savedContent); // Set content from local storage if it exists
    }

    // Listen for content updates from other users
    socket.on('update-content', (newContent) => {
      // Only update if the new content is different from the current one
      if (newContent !== editorContent) {
        setEditorContent(newContent);
        localStorage.setItem(`editorContent_${roomId}`, newContent); // Update local storage
      }
    });

    // Cleanup when the component is unmounted
    return () => {
      socket.off('update-content');
    };
  }, [roomId, editorContent]);

  // Send content updates to the server
  const handleChange = (content) => {
    setEditorContent(content);
    localStorage.setItem(`editorContent_${roomId}`, content);
    socket.emit('text-change', {roomId, newContent: content});  // Emit text change to server
    console.log(roomId,content)
  };

  return (
    <div>
      <div className="text-white rounded-t-lg mb-5">
        <h1 className='text-2xl font-bold text-green-700'>Text Editor</h1>
      </div>
      <ReactQuill value={editorContent} onChange={handleChange} />
    </div>
  );
}

export default TextEditor;
