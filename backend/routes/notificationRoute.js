import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { deleteNotification, getNotifications } from "../controllers/notification.controller.js";

const router = express.Router()

router.get("/", protectRoute, getNotifications)         //  get notifications route
    .delete("/", protectRoute, deleteNotification)      //  delete notification route

export default router