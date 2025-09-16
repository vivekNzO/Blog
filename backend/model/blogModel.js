import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
    },
    content:{
        required:true,
        type:String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Blog = mongoose.model("Blog",blogSchema)
export default Blog