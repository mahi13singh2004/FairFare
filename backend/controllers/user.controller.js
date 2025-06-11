import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateTokenAndCookie from "../utils/generateTokenAndCookie.js"

export const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({success:false,message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })
        
        const token=generateTokenAndCookie(res,user._id)

        return res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password:undefined
            },
            token
        })
    } 
    catch (error) {
        console.log("Error in signup controller",error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"Please Signup First"})
        }
        const passwordMatch=await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(400).json({success:false,message:"Invalid Password"})   
        }
        const token=generateTokenAndCookie(res,user._id)
        return res.status(200).json({
            success:true,
            message:"User Logged In successfully",
            user:{
                ...user._doc,
                password:undefined
            },
            token
        })
    } 
    catch (error) {
        console.log("Error in login controller",error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const logout=async(req,res)=>{
    res.clearCookie("token")
    return res.status(200).json({success:true,message:"User Logged Out successfully"})
}

export const checkAuth=async(req,res)=>{
    try {
        const user=req.user
        if(!user){
            return res.status(500).json({success:false,message:"User not found"})
        }
        return res.status(200).json({
            success:true,
            message:"Authenticated",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } 
    catch (error) {
        console.log("Error in checkAuth controller",error)
        return res.status(500).json({success:false,message:"Internal server error"})    
    }
}