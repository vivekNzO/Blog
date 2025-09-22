import pool from "../config/db.js";
import Blog from "../model/blogModel.js";

// export const createBlog = async (req, res) => {
//   const { title, content } = req.body;
//   const userId = req.user.id;
//   try {
//     if (!title || !content)
//       return res.status(400).json({ message: "All fields are required" });
//     const [result] = await pool.query(
//       "INSERT INTO blogs (title, content, author_id) VALUES (?,?,?)",
//       [title, content, userId]
//     );
//     res.status(201).json({ message: "Blog Created Successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error in create blog handler" });
//   }
// };
export const readBlogs = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT blogs.* , users.username FROM 
      blogs JOIN users ON blogs.author_id = users.id
      `);
    res.status(200).json(rows);
  } catch (error) {
    console.log("Error in Read Blogs handler", error);
    res.status(500).json({ message: "Error reading blogs" });
  }
};

// export const updateBlog = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const { id } = req.params;
//     if (!title || !content)
//       return res.status(400).json({ message: "All fields are required" });
//     const [rows] = await pool.query(
//       `
//     SELECT * FROM blogs WHERE id = ?
//   `,
//       [id]
//     );
//     if (rows.length === 0)
//       return res.status(404).json({ message: "Blogs not found" });
//     const blog = rows[0];
//     // check for user or admin
//     if (req.user.role !== "admin" && blog.author_id !== req.user.id) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden : not allowed to update this blog" });
//     }
//     const [result] = await pool.query(
//       `
//       UPDATE blogs SET title = ?, content = ? WHERE id = ?
//       `,
//       [title, content, id]
//     );

//     res.status(200).json({ message: "Blog updated successfully" });
//   } catch (error) {
//     console.log("Error in updatBlog handler", error);
//     res.status(500).json({ message: "Error updating Blogs" });
//   }
// };

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `
      SELECT * FROM blogs WHERE id = ?
      `,
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Blog does not exists" });
    const blog = rows[0];
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden Action" });
    }
    await pool.query(
      `
        DELETE FROM blogs WHERE id = ?
      `,
      [id]
    );
    res.status(200).json({ message: "Blog deleted Successfully" });
  } catch (error) {
    console.log("Error in delete blog handler", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const requestDeleteBlog = async (req, res) => {
  try {
    const { id: blogId } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;
    const [blogs] = await pool.query(
      `
      SELECT * FROM blogs where id = ? AND author_id = ?
      `,
      [blogId, userId]
    );

    if (blogs.length === 0) {
      return res.status(404).json({
        message: "You can only request to delete your own blogs",
      });
    }

    const [existingRequest] = await pool.query(
      `SELECT * FROM manage_requests 
       WHERE blog_id = ? AND requested_by = ? AND status = 'pending'`,
      [blogId, userId]
    );

    if (existingRequest.length > 0) {
      return res.status(400).json({
        message: "You already have a pending request for this blog",
      });
    }

    await pool.query(
      `INSERT INTO manage_requests
       (blog_id, request_type, reason, status, requested_by)
       VALUES (?, 'delete', ?, 'pending', ?)`,
      [blogId, reason, userId]
    );

    res.status(201).json({ message: "Delete request submitted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in request Delete handler" });
  }
};

export const createBlogRequest = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    if (!title || !content) {
      return res.statu(400).json({ message: "All fields are required" });
    }

    await pool.query(
      `
      INSERT INTO manage_requests(request_type,new_title,new_content,requested_by)
      VALUES('create',?,?,?)
      `,
      [title, content, userId]
    );

    res
      .status(201)
      .json({ message: "Blog creation request submitted for approval" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in createBlogRequest handler" });
  }
};

export const updateBlogRequest = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const { id } = req.params;
    if (!title || !content) {
      return res.status(401).json({ message: "All fields are necessary" });
    }

        const [existingRequest] = await pool.query(
      `SELECT * FROM manage_requests 
       WHERE blog_id = ? AND requested_by = ? AND status = 'pending'`,
      [id, userId]
    );

    if (existingRequest.length > 0) {
      return res.status(400).json({
        message: "You already have a pending request for this blog",
      });
    }
    await pool.query(
      `
      INSERT INTO manage_requests(blog_id,request_type,new_title,new_content,requested_by)
      VALUES (?,'update',?,?,?)
      `,
      [id, title, content, userId]
    );

    res
      .status(201)
      .json({ message: "Blog update request submitted for approval" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in updateBlogRequest handler" });
  }
};
