import express from "express";
import dotenv from "dotenv";
import authRoute from './routes/auth.route.js'
import mongoDB from './db/connectDB.js'
import cookieParser from "cookie-parser";
import userRoute from './routes/user.route.js'
import cloudinary from 'cloudinary'
import postRoute from './routes/post.route.js'
import notificationRoute from './routes/notificationRoute.js'

//  call express function to create server
const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//  dotenv config
dotenv.config();
const PORT = process.env.PORT

//  allow to receive cookie
app.use(cookieParser())
    .use(express.json())            //  allow to receive json

//  Routes
app.get('/', (req, res) => { res.send("Hello World") })  //  Homepage route
    .use("/api/auth", authRoute)                         //  auth route
    .use("/api/users", userRoute)                        //  user route
    .use("/api/posts", postRoute)                        //  post route
    .use("/api/notifications", notificationRoute)        //  notification route

// Server connection confirmation
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoDB()
});