import { generateToken } from "../lib/utils.js"
import User from "../model/userModel.js"

export const handleSignUp = async (req,res)=>{
    const {username,password} = req.body
    try {
        if(!username || !password)return res.status(401).json({message:"All fields are required"})
        const user = await User.findOne({username})
        if(user)return res.status(401).json({message:"Account already exists you should try loggin in"})
        const newUser = new User({
            username,
            password
        })
        await newUser.save()
        generateToken(username,res)
        res.status(201).json({message:newUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"error in SignUp controller"})
    }
}

export const handleLogin = async(req,res)=>{
    const {username,password} = req.body
    try {
        if(!username || !password)return res.status(401).json({message:"All fields are required"})
        const user = await User.findOne({username})
        if(!user)return res.status(401).json({message:"Account does not exist"})
        if(password!=user.password)return res.status(401).json({message:"Invalid credentials"})
        generateToken(username,res)
        res.status(200).json({message:user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in Login Controller"})
    }
}

export const handleLogout = async(req,res)=>{
    try {
        res.cookie("jwt","",{
            maxAge:0
        })
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in Logout Controller"})
    }
}