import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({success:false,message:"Please login first"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({success:false,message:"User not found"})
        }
        req.user=user
        next()
    } 
    catch (error) {
        console.log("Error in protect route backend",error);
        return res.status(500).json({success:false,message:"Internal server error"})  
    }
}

export default protectRoute