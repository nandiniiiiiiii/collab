const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Updated import
const cors = require('cors');
const connectDB = require('./db/index.js');
const dotenv = require('dotenv');
const app = express();
const server = http.createServer(app);
const kanbanRoutes = require('./routes/kanban.route.js'); 
const { v4: uuidv4 } = require('uuid'); // Use UUID for unique room IDs

// Configure CORS for both Express and Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'],        // Allowed methods
  },
});


app.use(cors()); // Enable CORS for REST endpoints
app.use(express.json());
// adding .env to path
dotenv.config({
    path: './env'
});

// Room-specific content storage
const roomContentMap = new Map();

// Socket.IO logic for real-time messaging
io.on('connection', (socket) => {
  console.log('a user connected');
  // Send the current content to the newly connected user
  socket.emit('update-content', roomContent);

  // Handle real-time text changes
  socket.on('text-change', (newContent) => {
    roomContent = newContent;
    socket.broadcast.emit('update-content', newContent); // Broadcast to all clients except the sender
  });

  socket.on('send_message', (msg) => {
    socket.broadcast.emit('receive_message', msg); // Broadcast message to all clients except ourselff
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/api', kanbanRoutes); // Mount the Kanban route

// Server listen
connectDB()
.then(()=>{
  server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
})
.catch((err)=>{
  console.log("MONGO db connection failed !!! ", err);
})