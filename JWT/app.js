import express from 'express'
<<<<<<< HEAD
import cookieParser from 'cookie-parser';

const app = express();
import userRouter from './routes/userRoutes.js'
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",userRouter);
=======
import userRouter from "./routes/User.route.js"
import protectedRoutes from "./routes/Private.route.js"


const app=express();


app.use(express.json())

app.use("/api/v1/user",userRouter);
app.use("/api/v1/protected",protectedRoutes);



>>>>>>> third-branch

export {app}