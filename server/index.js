import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO)
        .then(()=>{
            console.log("Conntected to DB!");
        })
        .catch((err)=>{
            console.log(err);
        });

app.listen(3000, ()=>{
    console.log('Server is running in port 3000!');
})