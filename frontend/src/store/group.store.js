import axios from "axios"
import {create} from "zustand"

axios.defaults.withCredentials=true

const useGroupStore=create((set)=>({
    groups:[],
    loading:false,
    err:null,

    getMyGroups:async()=>{
        set({loading:true, err:null})
        try {
            const res=await axios.get("http://localhost:5000/api/group/my")
            set({groups:res.data.groups,loading:false})
        } 
        catch (error) {
           set({err:error.response.data.message,loading:false}) 
        }
    },

    createGroup:async(name)=>{
        set({loading:true, err:null})
        try {
            const res=await axios.post("http://localhost:5000/api/group/create",{name})
            set((state)=>({
                groups:[...state.groups,res.data.group],
                loading:false
            }))
        } 
        catch (error) {
            set({err:error.response.data.message,loading:false})
        }
    },
}))