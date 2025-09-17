import express from 'express'
import { createBlog, deleteBlog, readBlogs, updateBlog } from '../controllers/blogControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import swaggerJSDoc from 'swagger-jsdoc'

const router = express.Router()


router.post("/create",createBlog)
router.get("/read",readBlogs)
router.put("/update/:id",updateBlog)
router.delete("/delete/:id",deleteBlog)

export default router