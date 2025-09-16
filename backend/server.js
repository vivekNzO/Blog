import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

const app = express();
dotenv.config()

const PORT = 5000;
app.use(cors())
app.use(express.json())
app.use(cookieParser());

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected to ${conn.connection.host}`)
    } catch (error) {
        console.log('Mongodb connection error',error)
    }
}

app.use("/auth",authRoutes)
app.use("/blog",blogRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT `+PORT);
    connectDB()
})

