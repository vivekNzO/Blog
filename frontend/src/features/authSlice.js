import { createSlice } from "@reduxjs/toolkit";
import API from "../utils/axios";

const initialState = {
    authUser : null,
    loading : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        checkAuth : async(state,payload)=>{
            try {
                const res = await API.get("/auth/me")
                authUser
            } catch (error) {
                
            }
        }
    }
})