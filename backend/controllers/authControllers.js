import pool from "../config/db.js"
import { generateToken } from "../lib/utils.js"
import User from "../model/userModel.js"

export const handleSignUp = async (req,res)=>{
    const {username,password} = req.body
    try {
        if(!username || !password)return res.status(400).json({message:"All fields are required"})
        const [existing] = await pool.query(`SELECT * FROM users WHERE username = ?`,[username])
        if(existing.length>0){
            return res.status(400).json({message:"User already exists"})
        }
        const [result] = await pool.query(`
                INSERT INTO users (username,password,role) VALUES (?,?,?)
            `,[username,password,"user"])

        const [rows] = await pool.query(`
            SELECT * FROM users where id = ?
            `,[result.insertId])
        const newUser = rows[0]
        // console.log(newUser)
        const token = generateToken(newUser,res)
        res.status(201).json({message:"User created successfully",id:result.insertId,token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"error in SignUp controller"})
    }
}

export const handleLogin = async(req,res)=>{
    const {username,password} = req.body
    try {
        if(!username || !password)return res.status(400).json({message:"All fields are required"})
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?",[username])
        if(rows.length===0)return res.status(401).json({message:"Invalid credentials"})
        const user = rows[0]
        // console.log(user)
        if(user.password !== password)return res.status(401).json({message:"Invalid Credentials"})
        const token = generateToken(user,res)
        res.status(200).json({message:"User successfully logged in",user:{id:user.id,username:user.username},token})
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