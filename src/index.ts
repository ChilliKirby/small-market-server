import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import authRoutes from './Routes/AuthRoute';


/*Configurations*/
dotenv.config();
const app = express();
const PORT = 3001;
app.use(express.json());

/*Routes*/
app.use('/auth', authRoutes);

/* Mongoose Setup */
mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    })
    .catch((error) => console.log(`${error} did not connect`));