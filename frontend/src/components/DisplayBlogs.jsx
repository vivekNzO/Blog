import React, { useEffect, useState } from 'react'

const DisplayBlogs = () => {
    const [blogsData, setBlogsData] = useState([])

    const BASE_URL = "http://localhost:5000"
    const fetchBlogs = async()=>{
        const data = await fetch(BASE_URL + `/blog/read`)
        const res  = data.json()
        // console.log(res)
        setBlogsData(res)
    }
    useEffect(()=>{
        fetchBlogs()
    },[])
  return (
    <div>

    </div>
  )
}

export default DisplayBlogs