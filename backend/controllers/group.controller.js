import Group from "../models/group.model.js";

export const createGroup=async(req,res)=>{
    try {
        const {name}=req.body
        const userId=req.user._id;    
        if(!name){
            return res.status(400).json({success:false, message:"Please Enter The Group Name"})
        }
        const group=await Group.create({
            name,
            members:[userId],
            createdBy:userId
        })
        await req.user.updateOne({$push:{groups:group._id}})
        return res.status(201).json({
            success:true,
            message:"Group Created Successfully",
            group
        })
    } 
    catch (error) {
        console.log("Error in creating group");
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}

export const getMyGroups=async(req,res)=>{
    try {
        const groups=await Group.find({members:req.user._id})
        return res.status(200).json({
            success:true,
            message:"Groups Fetched",
            groups
        })
    } 
    catch (error) {
        console.log("Error in getting groups")
        return res.status(500).json({success:false, message:"Internal Server Error"})
    }
}