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
        const token = generateToken(username,res)
        res.status(201).json({message:"User created Successfully",
            newUser,
            token
        })
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
        const token = generateToken(username,res)
        res.status(200).json({message:"Logged in successfully",
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in Login Controller"})
    }
}

export const handleLogout = async(req,res)=>{
    try {
        res.clearCookie("jwt",{
            httpOnly : true,
            sameSite : true
            
        })
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in Logout Controller"})
    }
}

export const handleMe= async(req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in handle Me handler"})
    }
}