import React, { useEffect, useState } from 'react'
import API from '../utils/axios.js'
import '../styles/blogs.css'
import {useNavigate} from 'react-router-dom'

const DisplayBlogs = () => {
    const [blogsData, setBlogsData] = useState([])
    const navigate = useNavigate()

    const handleDelete = async(id)=>{
      try {
        await API.delete(`/blog/delete/${id}`)
        setBlogsData((prev)=>prev.filter((item)=>item._id!==id))
      } catch (error) {
        console.log("Error deleting blog",error)
      }
    }

    useEffect(()=>{
      const fetchBlogs = async()=>{
        try {
          const res = await API.get("/blog/read")
          // console.log(res)
          setBlogsData(res.data.blogs)
        } catch (error) {
          console.log('error fetching blogs',error)
        }
      }
      fetchBlogs()
    },[])

  return (

    <div className='blogs-list'>
      {blogsData.length>0 ? (
        blogsData.map((blog)=>(
          <div className='blog-card' key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>


          <div className='author'>
            {`Author : ${blog.author.username}`}
          </div>
          {/* <div className='editable'>
          <span
          onClick={()=>navigate(`/blog/update/${blog._id}`)}
          >Edit</span>
          <span 
          onClick={()=>handleDelete(blog._id)}
          >Delete</span>
          </div> */}

          </div>
        ))
      ):
      (<p>No Blogs Found</p>)}
    </div>
  )
}

export default DisplayBlogs