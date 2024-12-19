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
  // socket.emit('update-content', roomContent);

  // Handle room creation
  socket.on('create_room', (callback) => {
    const roomId = uuidv4(); // Generate a unique room ID
    callback(roomId); // Send the room ID back to the client
    console.log(`Room created with ID: ${roomId}`);
  });

  // Handle joining a room
  socket.on('join_room', (roomId) => {
    if (!roomId) {
      console.error('Invalid roomId:', roomId);
      return;
    }

    socket.join(roomId); // Add the user to the room
    console.log(`User ${socket.id} joined room: ${roomId}`);

    // Send current content to the newly joined user
    if (roomContentMap.has(roomId)) {
      socket.emit('update-content', roomContentMap.get(roomId));
    } else {
      roomContentMap.set(roomId, ''); // Initialize room content if it doesn't exist
    }
  });

  socket.on('leave_room', (roomId) => {
    if (!roomId) {
      console.error('Invalid roomId:', roomId);
      return;
    }

    socket.leave(roomId);
    console.log(`User ${socket.id} left room: ${roomId}`);

    // Notify other users in the room
    // socket.to(roomId).emit('user_left', `User ${socket.id} has left the room.`);
  });


  // Handle real-time text changes
  socket.on('text-change', ({ roomId, newContent }) => {
    if (roomId) {
      roomContentMap.set(roomId, newContent); // Update content for the specific room
      socket.to(roomId).emit('update-content', newContent); // Broadcast to all users in the room
      console.log(roomId,newContent)
    }
  });

  // Handle real-time messaging
  socket.on('send_message', ({ roomId, msg }) => {
    if (roomId) {
      socket.to(roomId).emit('receive_message', msg); // Broadcast to all users in the room
      console.log(`roomId: '${roomId}' and ${msg}`);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });

});

app.use('/api', kanbanRoutes); // Mount the Kanban route

// Server listen
connectDB()
  .then(() => {
    server.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  })