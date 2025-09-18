import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET;

export function generateToken(userId,res){
    const token = jwt.sign({userId},secret,{
        expiresIn:"7d",
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
    })
    return token
}