import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

import dotenv from 'dotenv'
dotenv.config()

export const authMiddleware = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token)return res.status(401).json({message:"Unauthorized user"})
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded)
        req.user = decoded
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in auth middleware"})
    }
}
