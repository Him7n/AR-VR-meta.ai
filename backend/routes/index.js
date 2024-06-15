// backend/user/index.js

import express from 'express';
import userRouter from './user.js'; // Assuming user.js is the correct file path
import accountRouter from './account.js'; // Assuming account.js is the correct file path

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;
