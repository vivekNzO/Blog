import { Children, createContext, useEffect, useState } from "react";
import API from '../utils/axios.js'

export const AuthContext = createContext()

// provider
export const AuthProvider = ({children})=>{
    const [authUser,setAuthUser] = useState(null)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const checkAuth = async()=>{
            try {
                const res = await API.get("/auth/me")
                setAuthUser(res.data)
            } catch (error) {
                setAuthUser(null)
            }finally{
                setLoading(false)
            }
        }
        checkAuth()
    },[])

    const signup = async(username,password)=>{
        try {
            const res = await API.post("/auth/signup",{username,password})
            setAuthUser(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const login = async(username,password)=>{
        try {
            const res = await API.post("/auth/login",{username,password})
            setAuthUser(res.data)
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
        <AuthContext.Provider value={{authUser,setAuthUser,signup,login,logout,loading}}>
        {children}
        </AuthContext.Provider>
    )
}

