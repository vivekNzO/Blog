import express from 'express'
import { createBlog, deleteBlog, readBlogs, requestDeleteBlog, updateBlog } from '../controllers/blogControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()


router.post("/create",createBlog)
router.get("/read",readBlogs)
router.put("/update/:id",updateBlog)
router.delete("/delete/:id",deleteBlog)
router.post("/:id/requestDelete",requestDeleteBlog)

export default router