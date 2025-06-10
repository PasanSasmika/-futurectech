import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';


const app = express();
app.use(bodyParser.json())


const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
  console.log("Database connected");
})


app.use("/api/users",userRouter)
app.use("/api/product",productRouter)


app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)