// backend/index.js
import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3002;
const currentDirectory = process.cwd();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(currentDirectory, 'public')));
console.log(path.join(currentDirectory, 'public'));
// API routes
app.use("/api/v1", rootRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
