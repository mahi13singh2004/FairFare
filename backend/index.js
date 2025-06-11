import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/user.route.js";
import groupRoutes from "./routes/group.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();
dotenv.config()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/group",groupRoutes)

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on the port ${PORT}`);
})