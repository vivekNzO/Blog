import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const authMiddleware = async (req,res,next)=>{
    try {
        const secret = "veryhardtodecodesecret";
        const token = req.cookies.jwt;
        if(!token)return res.status(401).json({message:"Unauthorized user"})
        const decoded = jwt.verify(token,secret)
        const username = decoded.userId
        // console.log(username)
        const user = await User.findOne({username})
        if(!user)return res.status(401).json({message:"User not found"})
        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in auth middleware"})
    }
}
