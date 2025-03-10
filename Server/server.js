import dotenv from 'dotenv';
dotenv.config(); // Load env variables at the very top

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouters from './Routes/UserRouter.js';
import moviesRouter from './Routes/MoviesRouter.js';
import categoriesRouter from './Routes/CategoriesRouter.js'; 
import { errorHandler } from './Middlewares/errorMiddleware.js';
import uploadMiddleware from './Controllers/UploadFile.js';

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Main route
app.get("/", (req, res) => {
    res.send("API is running..."); 
});

// User routes
app.use("/api/users", userRouters);
app.use("/api/movies", moviesRouter);
app.use("/api/categories", categoriesRouter);

app.post('/api/upload', uploadMiddleware, (req, res) => {
    try {
        // File uploaded successfully
        const fileUrl = req.fileUrl; // Get the file URL from the request object
        res.status(200).json({ message: 'File uploaded successfully', fileUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});


