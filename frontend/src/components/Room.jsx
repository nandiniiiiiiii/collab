import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChatComponent from './ChatComponent';
import Kanban from './Kanban';
import TextEditor from './TextEditor';

function Room() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          {/* Buttons for navigation */}
          <div>
            <Link to="/">
            <button>Hone</button>
            </Link>
          </div>
          <div>
          <Link to="/kanban">
            <button>Go to Kanban</button>
          </Link>
          <Link to="/text-editor">
            <button>Go to Text Editor</button>
          </Link>
          </div>
        </nav>

        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<ChatComponent />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/text-editor" element={<TextEditor />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Room