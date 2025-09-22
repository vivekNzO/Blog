import express from 'express'
import {  createBlogRequest, deleteBlog, readBlogs, requestDeleteBlog,  updateBlogRequest } from '../controllers/blogControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()


router.post("/create",createBlogRequest)
router.get("/read",readBlogs)
router.put("/update/:id",updateBlogRequest)
router.delete("/delete/:id",deleteBlog)
router.post("/:id/requestDelete",requestDeleteBlog)

export default router