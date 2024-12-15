import User from "../model/user.model.js"
import Notification from "../model/notification.model.js"

//  get existing user profile
export const getProfile = async (req, res) => {
    try {
        //  get username
        const { username } = req.params
        //  get user
        const user = await User.findOne({ username })

        if (!user) return res.status(404).json({ error: `User ${username} not found` })

        res.status(200).json({ user })

    } catch (error) {
        console.log(`get profile error message: ${error}`)
        res.status(500).json({ error: `get profile error message: ${error}` })
    }
}

//  follow and un-follow
export const followUnFollowUser = async (req, res) => {
    try {
        //  get id
        const { id } = req.params
        //  get user
        const userToModify = await User.findById({ _id: id })
        //  get current user
        const currentUser = await User.findById({ _id: req.user._id })

        if (id === req.user._id) return res.status(400).json({ error: "you can't follow / un-follow" })

        if (!userToModify || !currentUser) return res.status(404).json({ error: "User not found" })

        //  check if user is following
        const isFollowing = currentUser.following.includes(id)

        if (isFollowing) {
            await User.findByIdAndUpdate({ _id: id }, { $pull: { followers: req.user._id } })
            await User.findByIdAndUpdate({ _id: req.user._id }, { $pull: { following: id } })
            res.status(200).json({ message: "Un-follow successfully" })
        } else {
            await User.findByIdAndUpdate({ _id: id }, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate({ _id: req.user._id }, { $push: { following: id } })
            const newNotification = new Notification({ from: req.user._id, to: userToModify._id, type: "follow" })
            await newNotification.save()
            res.status(200).json({ message: "Follow successfully" })
        }

    } catch (error) {
        console.log(`Error in follow and un follow message: ${error}`)
        res.status(500).json({ error: `Error in follow and un follow message: ${error}` })
    }
}

//  get suggested users
export const getSuggestedUsers = async (req, res) => {
    try {
        //  get current user
        const userId = req.user._id
        //  get user who followed me
        const userFollowedByMe = await User.findById({ _id: userId }).select('-password')

        //  get all users except current user and user who followed me
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }                   //  not include current user
                }
            }, {
                $sample: {
                    size: 10                             //  get 10 random users
                }
            }
        ])
        //  who not followed by me
        const filteredUser = users.filter((user) => !userFollowedByMe.following.includes(user._id))
        //  get 4 random users
        const suggestedUsers = filteredUser.slice(0, 4)
        //  remove password
        suggestedUsers.forEach((user) => user.password = null)
        res.status(200).json({ suggestedUsers })
    } catch (error) {

        console.log(`get suggested users error message: ${error}`)
        res.status(500).json({ error: `get suggested users error message: ${error}` })
    }
}

//  update user
export const updateUser = async (req, res) => {
    try {
        //  get user req id
        const userId = req.user._id
        //  get user
        const { username, fullName, email, currentPassword, newPassword, bio, link } = req.body
        //  get images
        // let { profileImage, coverImage } = req.body

        //  get current user
        let user = await User.findById({ _id: userId })
        if (!user) return res.status(404).json({ error: "User not found" })
        if ((!newPassword && currentPassword) || (newPassword && !currentPassword)) return res.status(400).json({ error: "CurrentPassword or NewPassword both are not matched" })

        if (currentPassword && password) {
            //  check if password match
            const isMatch = await bcrypt.compare(currentPassword, user.password)
            if (!isMatch) return res.status(400).json({ error: "CurrentPassword not matched" })
            if (newPassword.length < 6) return res.status(400).json({ error: "Password must have at least 6 char length" })

            //  hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            user.password = hashedPassword
        }
        // //  upload profile images
        // if (profileImage) {
        //     if (user.profileImage) {
        //         await cloudinary.uploader.destroy(user.profileImage.split("/").pop().split(".")[0])
        //     }
        //     const uploadedResponse = await cloudinary.uploader.upload(profileImage, { resource_type: "image" })
        //     profileImage = uploadedResponse.secure_url
        // }
        // //  upload cover images
        // if (coverImage) {
        //     if(user.coverImage){
        //         await cloudinary.uploader.destroy(user.coverImage.split("/").pop().split(".")[0])
        //     }
        //     const uploadedResponse = await cloudinary.uploader.upload(coverImage, { resource_type: "image" })
        //     coverImage = uploadedResponse.secure_url
        // }
        //  update user
        user.fullName = fullName || user.fullName
        user.username = username || user.username
        user.email = email || user.email
        user.bio = bio || user.bio
        user.link = link || user.link
        // user.profileImage = profileImg || user.profileImage
        // user.coverImage = coverImg || user.coverImage

        await user.save()

        user.password = null
        res.status(200).json({ user })

    } catch (error) {
        console.log(`update user error message: ${error}`)
        res.status(500).json({ error: `update user error message: ${error}` })
    }
}