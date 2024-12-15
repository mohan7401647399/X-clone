import express  from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createComment, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPost, likeUnLikePost } from "../controllers/post.controller.js";

//  post router config
const router = express.Router()

//  post routers
router
    .get("/getall", protectRoute, getAllPosts)                //  like and un-like post route
    .get("/following", protectRoute, getFollowingPosts)       //  User following post route
    .get("/likes/:id", protectRoute, getLikedPosts)           //  get liked post route
    .get("/user/:username", protectRoute, getUserPost)        //  get user post route
    .post("/create", protectRoute, createPost)                //  create post route
    .post("/like/:id", protectRoute, likeUnLikePost)          //  like and un-like post route
    .post("/comment/:id", protectRoute, createComment)        //  create comment route
    .delete("/:id", protectRoute, deletePost)                 //  delete post route

export default router