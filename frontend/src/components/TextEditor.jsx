import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // for snow theme
import { io } from 'socket.io-client';

function TextEditor() {
  const [editorContent, setEditorContent] = useState('');
  const socket = io('http://localhost:5000');  // Connect to the server

  // Listen for content updates from other users
  useEffect(() => {
    socket.on('update-content', (newContent) => {
      // Only update if the new content is different from the current one
      if (newContent !== editorContent) {
        setEditorContent(newContent);
      }
    });

    // Cleanup when the component is unmounted
    return () => {
      socket.off('update-content');
    };
  }, [editorContent, socket]);

  // Send content updates to the server
  const handleChange = (content) => {
    setEditorContent(content);
    socket.emit('text-change', content);  // Emit text change to server
  };

  return (
    <div>
      <ReactQuill value={editorContent} onChange={handleChange} />
    </div>
  );
}

export default TextEditor;
