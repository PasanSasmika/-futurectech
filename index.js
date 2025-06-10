import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";


const app = express();

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
  console.log("Database connected");
})

app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)