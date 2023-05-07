import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/connectToDB.js';
import { router as userRouter } from './routes/files.js';
import { router as showRouter } from './routes/show.js';
import { router as downloadRouter } from './routes/download.js';

// basic configuration
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// routes
app.use('/api/files' , userRouter);
app.use('/api/show' , showRouter);
app.use('/api/download' , downloadRouter);

app.listen(PORT , ()=>{
    console.log("The backend server is running on " + PORT);
})