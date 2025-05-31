import express from "express";

import authRoutes from './Routes/AuthRoute';


const app = express();
const PORT = 3000;

// app.get('/', (req, res) =>{
//     res.send('Hello from Express!');
// });



app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});