// Import necessary modules
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoute.js';
import messageRoutes from './routes/messageRoute.js'

// Load environment variables from .env file
dotenv.config();

// creating express object
const app = express();

app.use(cors());
app.use(express.json());

// user routing
app.use('/api/auth',userRoutes);

// message routing
app.use('/api/messages',messageRoutes);

// Connect to MongoDB using the connection string stored in the environment variable MONGO_URL
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Error in Connecting to DB:', err));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
