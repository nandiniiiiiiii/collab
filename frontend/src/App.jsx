import './App.css';
import '@syncfusion/ej2-react-kanban/styles/material.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LinkGeneration from './components/LinkGeneration';

function App() {
  return (
  <div className='flex justify-center items-center pt-20'>
      <Router>
      <div className="flex justify-center items-center pt-20">
        <Routes>
          {/* Main Page for Link Generation */}
          <Route path="/" element={<LinkGeneration/>} />
          
          {/* Room-Specific Content */}
          {/* <Route path="/room/:roomId" element={<Room />} /> */}
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
