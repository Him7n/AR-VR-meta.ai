// backend/index.js
import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index.js'; // Assuming index.js is the correct file path

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3002, () => {
  console.log('Server is running on port 3002');
});
