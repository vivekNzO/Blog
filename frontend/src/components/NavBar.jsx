import React, { useContext } from 'react'
import '../styles/header.css'
import { AuthContext } from '../store/AuthContext'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const {logout,authUser} = useContext(AuthContext)
  return (
    <div className='header'>
        <h1>BLOG APPLICATION</h1>
        <div>
            <button>Write Blog</button>

            {!authUser? 
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
           
            :
            <button onClick={logout}>
            Logout
            </button>
            }
        </div>
        
    </div>
  )
}

export default NavBar