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
        const blogs = await Blog.find().populate("author","username ")
        res.status(200).json({blogs})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error in read Blog handler"})
    }
}


export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in update Blog handler" });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting blog" });
  }
};

