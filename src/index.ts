import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import helmet from "helmet";
import rateLimit from 'express-rate-limit';

import authRoutes from './Routes/AuthRoute';
import adminBusinessRoutes from './Routes/AdminBusinessRoute';
import usersBusinessRoutes from './Routes/UsersBusinessRoute';


/*Configurations*/
dotenv.config();
const app = express();
const PORT = 3001;
app.use(helmet());
app.use(express.json());

//global limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, try again later"
});

//auth limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: "Login not available at this time.",
});



/*Routes*/
app.use('/auth', authLimiter, authRoutes);
app.use('/admin/business', globalLimiter, adminBusinessRoutes);
app.use('/users/business', globalLimiter, usersBusinessRoutes);

/* Mongoose Setup */
mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    })
    .catch((error) => console.log(`${error} did not connect`));