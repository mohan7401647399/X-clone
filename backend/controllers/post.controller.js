import User from "../model/user.model.js"
import Post from "../model/post.model.js"
import Notification from "../model/notification.model.js"
import { v2 as cloudinary } from "cloudinary";

//  create post
export const createPost = async (req, res) => {
    try {
        //  get text
        const { text } = req.body
        //  get image
        let { img } = req.body
        //  get user id from frontend
        const userId = req.user._id.toString()
        //  get user in our database
        const user = await User.findById(userId)

        if (!user) return res.status(404).json({ error: "User not found" })

        if (!text && !img) return res.status(400).json({ error: "Text or Image is required" })
        //  upload image
        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url
        }
        //  create post
        const newPost = new Post({ user: userId, text, img })
        await newPost.save()

        res.status(201).json({ message: "Post created successfully", newPost })
    } catch (error) {
        console.log(`backend create post error message: ${error}`)
        res.status(500).json({ error: `backend create post error message: ${error}` })
    }
}

//  delete post by id
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findOne({ _id: id })
        if (!post) return res.status(404).json({ error: "Post not found" })
        //  check if post belongs to current user
        if (post.user.toString() !== req.user._id.toString()) return res.status(400).json({ error: "You'r not authorized to delete this post" })
        //  delete image from cloudinary
        if (post.img) {
            await cloudinary.uploader.destroy(post.img.split("/").pop().split(".")[0])
        }
        //  delete post from database
        await Post.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Post deleted successfully" })
    } catch (error) {
        console.log(`delete post error message: ${error}`)
        res.status(500).json({ error: `delete post error message: ${error}` })
    }
}

//  create comment on post
export const createComment = async (req, res) => {
    try {
        const { text } = req.body
        const postId = req.params.id
        const userId = req.user._id
        //  check if comment is empty
        if (!text) return res.status(400).json({ error: "Comment is required" })
        //  get post from database
        const post = await Post.findById(postId)
        //  check if post exist
        if (!post) return res.status(404).json({ error: "Post not found" })
        //  create a comment object
        const comment = {
            text,
            user: userId
        }
        // add comment to post
        post.comments.push(comment)
        await post.save()
        res.status(200).json({ message: "Comments created successfully", post })
    } catch (error) {
        console.log(`create comment error message: ${error}`)
        res.status(500).json({ error: `create comment error message: ${error}` })
    }
}

//  like and un-like post
export const likeUnLikePost = async (req, res) => {
    try {
        //  get user id
        const userId = req.user._id
        //  get post id
        const { id: postId } = req.params
        //  post check in database
        const post = await Post.findOne({ _id: postId })
        //  check if post exist
        if (!post) return res.status(404).json({ error: "Post not found" })
        //  check if user already liked the post
        const userLikedPost = post.likes.includes(userId)
        //  if user already liked the post
        if (userLikedPost) {
            //  remove like
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } })

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString())
            res.status(200).json(updatedLikes)
        } else {
            //  add like
            post.likes.push(userId)
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } })
            await post.save()
            //  create notification
            const notification = await Notification({
                from: userId,
                to: post.user,
                type: "like"
            })
            await notification.save()
            const updatedLikes = post.likes
            res.status(200).json(updatedLikes)
        }
    } catch (error) {
        console.log(`like un-like post error message: ${error}`)
        res.status(500).json({ error: `like un-like post error message: ${error}` })
    }
}

//  get all posts
export const getAllPosts = async (req, res) => {
    try {
        //  get all posts from database
        const posts = await Post.find().sort({ createdAt: -1 }).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: ["-password"] })
        //  check if posts exist
        if (posts.length === 0) return res.status(200).json([]);

        res.status(200).json(posts);
    } catch (error) {
        console.log(`get all posts error message: ${error}`)
        res.status(500).json({ error: `get all posts error message: ${error}` })
    }
}

//  get liked posts 
export const getLikedPosts = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById({ _id: userId })
        if (!user) return res.status(404).json({ error: "User not found" })
        //  get liked posts
        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } }).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: ["-password", "-email", "-following", "-followers", "-bio", "-link"] })
        res.status(200).json(likedPosts)
    } catch (error) {
        console.log(`get liked posts error message: ${error}`)
        res.status(500).json({ error: `get liked posts error message: ${error}` })
    }
}

//  get following posts
export const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ error: "User not found" })
        //  get following posts from database
        const following = user.following
        const feedPosts = await Post.find({ user: { $in: following } }).sort({createdAt: -1}).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: ["-password", "-email", "-following", "-followers", "-bio", "-link"] })

        res.status(200).json(feedPosts)
    } catch (error) {
        console.log(`get following posts error message: ${error}`)
        res.status(500).json({ error: `get following posts error message: ${error}` })
    }
}

//  get user post
export const getUserPost = async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ error: "User not found" })
        //  get user post from database
        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: "-password" })

        res.status(200).json(posts)
    } catch (error) {
        console.log(`get user post error message: ${error}`)
        res.status(500).json({ error: `get user post error message: ${error}` })
    }
}