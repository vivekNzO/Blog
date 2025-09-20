import React, { useContext, useEffect, useState } from 'react'
import API from '../utils/axios.js'
import '../styles/blogs.css'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../store/AuthContext.jsx'

const DisplayBlogs = () => {
    const [blogsData, setBlogsData] = useState([])
    const navigate = useNavigate()
    const {authUser} = useContext(AuthContext)

    const handleDelete = async(id)=>{
      try {
        await API.delete(`/blog/delete/${id}`)
        setBlogsData((prev)=>prev.filter((item)=>item.id!==id))
      } catch (error) {
        console.log("Error deleting blog",error)
      }
    }

    useEffect(()=>{
      const fetchBlogs = async()=>{
        try {
          const res = await API.get("/blog/read")
          // console.log(res.data)
          setBlogsData(res.data)
        } catch (error) {
          console.log('error fetching blogs',error)
        }
      }
      fetchBlogs()
    },[])

  return (

    <div className='blogs-list'>
      {blogsData?.length>0 ? (
        blogsData.map((blog)=>(
          <div className='blog-card' key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>


          <div className='author'>
            {`Author : ${blog.username}`}
            </div>

          {authUser?.role==='admin' &&
          <div className='editable'>
          <span style={{color:'red'}}
          onClick={()=>navigate(`/blog/update/${blog.id}`)}
          >Edit</span>
          <span 
          style={{color:'red'}}
          onClick={()=>handleDelete(blog.id)}
          >Delete</span>
          </div>}

          </div>
        ))
      ):
      (<p>No Blogs Found</p>)}
    </div>
  )
}

export default DisplayBlogs