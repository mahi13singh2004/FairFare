import mongoose from "mongoose";

const connectDB=async()=>{
    try {
      const conn=await mongoose.connect(process.env.MONGO_URI)
      console.log(`Connected to the database ${conn.connection.host}`);
    } 
    catch (error) {
        console.log("Error connecting to the database",error);    
        process.exit(1);
    }
}

export default connectDB;