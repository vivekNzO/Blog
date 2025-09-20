import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import DisplayBlogs from './components/DisplayBlogs'
import { AuthContext } from './store/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import EditBlog from './Pages/EditBlog'
import CreateBlog from './Pages/CreateBlog'
import MyBlogs from './Pages/MyBlogs'
import AdminDashboard from './Pages/AdminDashboard'
import BlogDetail from './Pages/BlogDetail'

function App() {

  const {authUser,setAuthUser,loading} = useContext(AuthContext)

    if (loading) {
    return <p>Loading...</p>   // prevents premature redirect
  }

  console.log(authUser)

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>} />
        <Route path="/login" element={!authUser?<Login/>:<Navigate to="/"/>} />
        <Route path="/signup" element={!authUser?<SignUp/>:<Navigate to="/"/>} />
        <Route path="/blog/update/:id" element={authUser?<EditBlog/>:<Navigate to="/login" />}/>
        <Route path='/blog/createblog' element={authUser?<CreateBlog/>:<Navigate to="/login"/>} />
        <Route path='/blog/myblogs' element={authUser?<MyBlogs/>:<Navigate to="/login"/>} />
        <Route path='/admin/dashboard' element= {authUser?.role==='admin'?<AdminDashboard/>:<Navigate to="/login"/>}/>
        <Route path='/blog/:id' element={authUser? <BlogDetail/> : <Navigate to="/login"/>}/>
      </Routes> 
    </>
  )
}

export default App
