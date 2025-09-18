import React, { useEffect, useState, useContext } from 'react'
import API from '../utils/axios'
import { AuthContext } from '../store/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/blogs.css'

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog/read")
        // filter blogs where author._id === logged in user
        console.log(res)
        const myBlogs = res.data.blogs.filter(
          (blog) => blog.author.username === authUser
        )
        setBlogs(myBlogs)
      } catch (error) {
        console.error("Error fetching blogs", error)
      }
    }
    if (authUser) {
      fetchBlogs()
    }
  }, [authUser])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/blog/delete/${id}`)
      setBlogs(blogs.filter((b) => b._id !== id))
    } catch (error) {
      console.error("Error deleting blog", error)
    }
  }

  return (
    <div >
      <h1>My Blogs</h1>
      <div className='blogs-list'>
      {blogs.length === 0 ? (
        <p>You haven’t created any blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <div className='editable'>
            <button onClick={() => navigate(`/blog/update/${blog._id}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>

          </div>
        ))
      )}
      </div>
    </div>
  )
}

export default MyBlogs
