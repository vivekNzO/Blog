import express from 'express'
import {  createBlogRequest, deleteBlog, readBlogs,  updateBlog } from '../controllers/blogControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()


router.post("/create",createBlogRequest)
router.get("/read",readBlogs)
router.put("/update/:id",updateBlog)
router.delete("/delete/:id",deleteBlog)
router.post("/:id/requestDelete",deleteBlog)

export default router