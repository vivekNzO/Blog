import React, { useContext, useState } from 'react'
import { AuthContext } from '../store/AuthContext'

const Login = () => {

    const {login} = useContext(AuthContext)

    const[username,setUserName] = useState("")
    const[password,setPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        login({username,password})
    }
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type='text'
                    value={username}
                    required
                    onChange={(e)=>setUserName(e.target.value)}
                />
            </div>

            <div>
                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />
            </div>

            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login