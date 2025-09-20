import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET;

export function generateToken(user,res){
    const token = jwt.sign({id:user.id,username:user.username,role:user.role},secret,{
        expiresIn:"7d",
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
    })
    return token
}