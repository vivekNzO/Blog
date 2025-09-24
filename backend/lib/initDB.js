import pool from "../config/db.js";

export const initDB = async () => {
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS blogapplicationcrud`);
    await pool.query(`USE blogapplicationcrud`);

    // USERS TABLE
    await pool.query(`
      CREATE TABLE IF NOT EXISTS roles(
      id INT AUTO_INCREMENT PRIMARY KEY,
      role ENUM('admin','user') DEFAULT 'user'
      )
      `);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role_id INT NOT NULL,
                FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE
            )
        `);

    // BLOGS TABLE

    await pool.query(`
            CREATE TABLE IF NOT EXISTS blogs(
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(25) NOT NULL,
                content TEXT NOT NULL,
                author_id INT,
                status ENUM('pending','approved','rejected') DEFAULT 'pending',
                FOREIGN KEY(author_id) references users(id) ON DELETE CASCADE
            )
            `);

    // CREATE TABLE roles

    // DELETE REQUESTS TABLE

    // await pool.query(`
    //         CREATE TABLE IF NOT EXISTS delete_requests(
    //             id INT AUTO_INCREMENT PRIMARY KEY,
    //             blog_id INT NOT NULL,
    //             user_id INT NOT NULL,
    //             reason TEXT NOT NULL,
    //             status ENUM('pending','approved','rejected') DEFAULT 'pending',
    //             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //             FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    //             FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    //         )

    //         `);

    // MANAGE REQUESTS TABLE for update, delete and create handlers

    // await pool.query(`
    //     CREATE TABLE IF NOT EXISTS manage_requests(
    //         id INT PRIMARY KEY AUTO_INCREMENT,
    //         blog_id INT NULL,
    //         request_type ENUM('create','update','delete') NOT NULL,
    //         new_title VARCHAR(255)  NULL,
    //         new_content TEXT  NULL,
    //         reason TEXT NULL,
    //         status ENUM('approved','rejected','pending') default 'pending',
    //         requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //         requested_by INT NOT NULL,
    //         FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    //         FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE CASCADE
    //     )
    //     `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories(
        id INT PRIMARY KEY AUTO_INCREMENT,
        category VARCHAR(255) NOT NULL,
        parent_id INT DEFAULT NULL
      )
      `);

    console.log("Database initialized successfully");
    console.log("Connected to DB:", process.env.DB_NAME);
  } catch (error) {
    console.log("Error initializing database", error);
  }
};
