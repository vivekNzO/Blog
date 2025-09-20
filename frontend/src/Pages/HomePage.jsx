import React, { useContext } from 'react'
import DisplayBlogs from '../components/DisplayBlogs'
import { AuthContext } from '../store/AuthContext'

const HomePage = () => {

  const {authUser} = useContext(AuthContext)
  return (
    <div style={{margin:"24px 64px"}}>
      <h1>{`Welcome ${authUser.username}`}</h1>
      <DisplayBlogs/>
    </div>
  )
}

export default HomePage