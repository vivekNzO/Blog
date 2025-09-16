import express from 'express'
import { createBlog, deleteBlog, readBlogs, updateBlog } from '../controllers/blogControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/create",authMiddleware,createBlog)
router.get("/read",readBlogs)
router.put("/update/:id",updateBlog)
router.delete("/delete/:id",deleteBlog)

export default router