import pool from "../config/db.js";

export const initDB = async()=>{
    try {
        await pool.query(`CREATE DATABASE IF NOT EXISTS blogapp`)
        await pool.query(`USE blogapp`)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('user','admin') DEFAULT 'user'
            )
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS blogs(
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(25) NOT NULL,
                content TEXT NOT NULL,
                author_id INT,
                FOREIGN KEY(author_id) references users(id) ON DELETE CASCADE
            )
            `)

            console.log("Database initialized successfully")
    } catch (error) {
        console.log("Error initializing database",error)
    }
}