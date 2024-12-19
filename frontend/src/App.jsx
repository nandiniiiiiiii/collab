import './App.css';
import '@syncfusion/ej2-react-kanban/styles/material.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkGeneration from './components/LinkGeneration';
import Room from './components/Room'
import ChatComponent from './components/ChatComponent';
import Kanban from './components/Kanban';
import TextEditor from './components/TextEditor';

function App() {
  return (
  <div className='flex justify-center items-center pt-20'>
      <Router>
      <div className="flex justify-center items-center pt-20">
        <Routes>
          {/* Main Page for Link Generation */}
          <Route path="/" element={<LinkGeneration/>} />
          
          {/* Room-Specific Content */}
          <Route path="/room/:roomId" element={<Room />}>
            {/* Nested child routes */}
            <Route path="kanban" element={<Kanban />} />
            <Route path="text-editor" element={<TextEditor />} />
            <Route index element={<ChatComponent />} /> {/* This is the default route */}
          </Route>

        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
