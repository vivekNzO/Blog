import { Children, createContext, useEffect, useState } from "react";
import API from '../utils/axios.js'

export const AuthContext = createContext()

// provider
export const AuthProvider = ({children})=>{
    const [authUser,setAuthUser] = useState(null)

    useEffect(()=>{
        const checkAuth = async()=>{
            try {
                const res = await API.get("/auth/me")
                console.log(res)
                setAuthUser(res.data.username)
            } catch (error) {
                setAuthUser(null)
            }
        }
        checkAuth()
    },[])

    const signup = async(username,password)=>{
        try {
            const res = await API.post("/auth/signup",{username,password})
            setAuthUser(res.data.username)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const login = async(username,password)=>{
        try {
            const res = await API.post("/auth/login",{username,password})
            setAuthUser(res.data.username)
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async()=>{
        try {
            await API.post("/auth/logout")
            setAuthUser(null)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <AuthContext.Provider value={{authUser,setAuthUser,signup,login,logout}}>
        {children}
        </AuthContext.Provider>
    )
}

