import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/db.js';
import projectRouter from './routes/projectRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/projects', projectRouter);

// Test Route
app.get('/', (req, res) => {
    res.send('ProjectEval AI API Working');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server Started on PORT: ${PORT}`);
});