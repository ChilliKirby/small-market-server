import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import authRoutes from './Routes/AuthRoute';
import adminBusinessRoutes from './Routes/AdminBusinessRoute';


/*Configurations*/
dotenv.config();
const app = express();
const PORT = 3001;
app.use(express.json());

/*Routes*/
app.use('/auth', authRoutes);
app.use('/admin/business', adminBusinessRoutes);

/* Mongoose Setup */
mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    })
    .catch((error) => console.log(`${error} did not connect`));