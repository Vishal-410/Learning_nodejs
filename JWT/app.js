import express from 'express'

import cookieParser from 'cookie-parser';

const app = express();
import userRouter from './routes/userRoutes.js'
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",userRouter);


export {app}