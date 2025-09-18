import React, { useState } from 'react'
import API from '../utils/axios'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const navigate = useNavigate()

    const handleCreate = async(e)=>{
        e.preventDefault()
        try {
            const res = await API.post("/blog/create",{title,content})
            navigate("/")
        } catch (error) {
            console.log("Error in Creating blog",error)
        }
    }
  return (
    <div className='edit-blog-container'>
        <form className='edit-blog-form' onSubmit={handleCreate}>
        <div>
            <label>Title</label>
            <input
                type='text'
                required
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder='Title'
            />
        </div>
        <div>
            <label>Content</label>
            <textarea
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                rows={'6'}
                placeholder='Content'
                required
            />
        </div>
        <button type='submit'>Post Blog</button>
        </form>
    </div>
  )
}

export default CreateBlog