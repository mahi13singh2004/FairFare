import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { createGroup, getMyGroups } from "../controllers/group.controller.js";
const router=express.Router()

router.post("/create",protectRoute,createGroup)
router.get("/my",protectRoute,getMyGroups)

export default router