import React, { useContext, useState } from 'react'
import { AuthContext } from '../store/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/formStyles.css'

const Login = () => {

    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

    const[username,setUserName] = useState("")
    const[password,setPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        login(username,password)
    }
    
  return (
    <div className='form-style'>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type='text'
                    value={username}
                    required
                    placeholder='John Doe'
                    onChange={(e)=>setUserName(e.target.value)}
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    placeholder='********'
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />
            </div>

            <button type='submit'>Login</button>
        </form>

        <Link to="/signup">
            <span>Don't have an account? Sign Up </span> 
        </Link>
    </div>
  )
}

export default Login