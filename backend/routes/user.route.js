import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { followUnFollowUser, getProfile, getSuggestedUsers, updateUser } from "../controllers/user.controller.js";

//  router config
const router = express.Router()

//  routers
router
    .get("/profile/:username", protectRoute, getProfile)         //  user route
    .get("/suggested", protectRoute, getSuggestedUsers)          //  suggested user route
    .post("/follow/:id", protectRoute, followUnFollowUser)        //  follow and un-follow user route
    .post('/update', protectRoute, updateUser)                   //  update user route
    
export default router