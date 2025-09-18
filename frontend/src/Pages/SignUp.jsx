import React, { useContext, useState } from 'react'
import { AuthContext } from '../store/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/formStyles.css'

const SignUp = () => {

    const {signup} = useContext(AuthContext)
    const navigate = useNavigate()

    const[username,setUserName] = useState("")
    const[password,setPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        signup(username,password)

    }
  return (
    <div className='form-style'>
        <h1>Signup Page</h1>
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

        <Link to="/login">
            <span>Already have an account? Log in </span> 
        </Link>
    </div>
  )
}

export default SignUp