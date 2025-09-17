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

function App() {

  const {authUser,setAuthUser} = useContext(AuthContext)
  console.log(authUser)

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>} />
        <Route path="/login" element={!authUser?<Login/>:<Navigate to="/"/>} />
        <Route path="/signup" element={authUser?<SignUp/>:<Navigate to="/"/>} />
      </Routes>
    </>
  )
}

export default App
