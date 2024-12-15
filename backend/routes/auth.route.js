import express from "express";
import { login, logout, signup, getUser } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

//  router config
const router = express.Router()

//  routers
router
    .post("/signup", signup)                 //  sign up route
    .post("/login", login)                   //  login route
    .post("/logout", logout)                 //  logout route
    .get('/get', protectRoute, getUser)      //  get protected login user route

export default router