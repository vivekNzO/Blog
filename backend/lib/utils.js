import jwt from 'jsonwebtoken'

const secret = "veryhardtodecodesecret";

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