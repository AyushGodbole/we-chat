import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';  // Import the correct class from socket.io

import userRoutes from './routes/userRoute.js';
import messageRoutes from './routes/messageRoute.js';

// Load environment variables from .env file
dotenv.config();

// creating express object
const app = express();

app.use(cors());
app.use(express.json());

// user routing
app.use('/api/auth', userRoutes);

// message routing
app.use('/api/messages', messageRoutes);

//if random url is hitted
app.all('*',(req,res)=>{
  res.status(400).send('OOPS! 404 page not found');
});

// Connect to MongoDB using the connection string stored in the environment variable MONGO_URL
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error in Connecting to DB:', err));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// socket connection logic
const io = new Server(server, {  // Use Server instead of Socket
  cors: {
    origin: `https://we-chat-sigma.vercel.app`,
    // origin: `https://localhost:3000`,
    credentials: true,
  }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    // console.log('send-msg',data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-receive', data.message);  // Ensure the event name matches
    }
  });
});
