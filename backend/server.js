import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { authMiddleware } from './middlewares/authMiddleware.js';
import { initDB } from './lib/initDB.js';
import { checkAdmin } from './middlewares/checkAdmin.js';
import adminRoutes from './routes/adminRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
// import swagger from './swagger.js';

const app = express();
dotenv.config()

const PORT = 5000;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser());

const swaggerDoc = YAML.load("./swagger.yaml")
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// const connectDB = async()=>{
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI)
//         console.log(`DB connected to ${conn.connection.host}`)
//     } catch (error) {
//         console.log('Mongodb connection error',error)
//     }
// }

app.use("/auth",authRoutes)
app.use("/blog",authMiddleware,blogRoutes)
app.use("/admin",authMiddleware,checkAdmin,adminRoutes)
app.use("/categories",authMiddleware,categoryRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT `+PORT);
    // connectDB()
    initDB()
})

