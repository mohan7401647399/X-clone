import express from "express";
import dotenv from "dotenv";
import authRoute from './routes/auth.route.js'
import mongoDB from './db/connectDB.js'
import cookieParser from "cookie-parser";
import userRoute from './routes/user.route.js'
import cloudinary from 'cloudinary'
import postRoute from './routes/post.route.js'
import notificationRoute from './routes/notificationRoute.js'
import cors from 'cors'
import path from 'path'

//  call express function to create server
const app = express();
const __dirname = path.resolve();

//  dotenv config
dotenv.config();
const PORT = process.env.PORT

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//  cors config
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser())                          //  allow to receive cookie
    .use(express.json({ limit: "5mb" }))         //  allow to receive json data with 5mb limit & default limit is 100kb
    .use(express.urlencoded({ extended: true })) //  allow to receive form data

//  Routes
app.use("/api/auth", authRoute)                         //  auth route
    .use("/api/users", userRoute)                        //  user route
    .use("/api/posts", postRoute)                        //  post route
    .use("/api/notifications", notificationRoute)        //  notification route

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}


// Server connection confirmation
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoDB()
});