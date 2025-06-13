import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';


const app = express();
app.use(bodyParser.json())


const mongoUrl = process.env.MONGODB_URI;
if (!mongoUrl) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {});
    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();

app.use("/api/users",userRouter)
app.use("/api/product",productRouter)


app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)