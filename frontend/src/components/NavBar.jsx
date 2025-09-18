import React, { useContext } from 'react'
import '../styles/header.css'
import { AuthContext } from '../store/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/createblog.css"

const NavBar = () => {
  const {logout,authUser} = useContext(AuthContext)
  const navigate = useNavigate();
  return (
    <div className='header'>
        <h1 onClick={()=>navigate("/") }>BLOG APPLICATION</h1>
        <div>
        {authUser &&
          <button
          onClick={()=>navigate("/blog/createblog")}
        >Write Blog</button>}

        {authUser && 
        <button onClick={()=>navigate("/blog/myblogs")}>
          My Blogs
        </button>
        }

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