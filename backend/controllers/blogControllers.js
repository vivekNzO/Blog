import Blog from "../model/blogModel.js"

export const createBlog = async(req,res)=>{
    const {title,content} = req.body
    try {
        if(!title || !content)return res.status(400).json({message:"All fields are required"})
        const blog = new Blog({
            title,
            content,
            author:req.user._id
        })
        await blog.save()
        res.status(201).json({data:blog})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in create blog handler"})
    }
}
export const readBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find().lean()
        res.status(200).json({blogs})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error in read Blog handler"})
    }
}
export const updateBlog = async(req,res)=>{
    try {
        const {id} = req.params
        const {title,content} = req.body
        if(!title || !content)return res.status(401).json({message:"All fields are required"})
        const blog = await Blog.findByIdAndUpdate(
            id,
            {title,content},
            {new:true}
        )
        if(!blog)return res.status(404).json({message:"Blog not found"})
        res.json({blog})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in update Blog handler"})
    }
}
export const deleteBlog = async(req,res)=>{
    try {
        const {id} = req.params
        const blog = await Blog.findByIdAndDelete(id)
        if(!blog)return res.status(400).json({message:"blog not found"})
        res.json({message:"Blog deleted successfully",blog})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in delete handler"})
    }
}
