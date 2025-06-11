import axios from "axios"
import {create} from "zustand"

axios.defaults.withCredentials=true

const useAuthStore= create((set)=>({
    user:null,
    loading:false,
    err:null,

    setUser:(user)=>set({user}),

    signup:async(name,email,password)=>{
        set({loading:true, err:null});
        try {
            const res=await axios.post("http://localhost:5000/api/auth/signup",{name,email,password});
            set({user:res.data.user,loading:false})
        } 
        catch (error) {
            set({err:error.response.data.message,loading:false})
        }
    },

    login:async(email,password)=>{
        set({loading:true,err:null})
        try {
            const res=await axios.post("http://localhost:5000/api/auth/login",{email,password});
            set({user:res.data.user,loading:false})    
        } 
        catch (error) {
            set({err:error.response.data.message,loading:false})
        }
    },

    logout:async()=>{
        try {
            await axios.post("http://localhost:5000/api/auth/logout");
            set({user:null,err:null})
        } 
        catch (error) {
            set({err:error.response.data.message,loading:false})    
        }
    },

    checkAuth:async()=>{
        set({loading:true})
        try {
            const res=await axios.get("http://localhost:5000/api/auth/checkAuth");
            set({user:res.data.user,loading:false})    
        } 
        catch (error) {
            set({err:error.response.data.message,loading:false})    
        }
    }
}))

export default useAuthStore