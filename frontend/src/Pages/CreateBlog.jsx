import React, { useState } from 'react'
import API from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import BlogEditor from '../components/BlogEditor'

const CreateBlog = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const navigate = useNavigate()

    const handleCreate = async(e)=>{
        e.preventDefault()
        try {
            const res = await API.post("/blog/create",{title,content})
            alert("Blog creation request submitted for approval")
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
                maxLength={70}
            />
            <small>
            {title.length === 70 && (
                <span style={{color:"Red"}}>Title can’t be longer than 70 characters.</span>
            )}
            </small>
        </div>
        <div>
            <label>Content</label>
            <textarea
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                rows={'16'}
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