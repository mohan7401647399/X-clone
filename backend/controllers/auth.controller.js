import User from "../model/user.model.js"
import bcrypt from 'bcryptjs'
import generateToken from "../utils/generateToken.js"

//  signup controller fn
export const signup = async (req, res) => {
    try {
        const { username, fullName, email, password } = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailRegex.test(email)) return res.status(400).json({ error: `Invalid email ${email} format` })

        //  check if email or username already exist
        const existingEmail = await User.findOne({ email }),
            existingUsername = await User.findOne({ username })

        if (existingEmail || existingUsername) return res.status(400).json({ error: `Already Existing email ${email} or username ${username}` })

        if (password.length < 6) return res.status(400).json({ error: `Password must have at least 6 char length` })

        //  hash password
        const salt = await bcrypt.genSalt(10),
            hashedPassword = await bcrypt.hash(password, salt)

        //  create new user
        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                user: newUser
                //  _id: newUser._id,
                // username: newUser.username,
                // fullName: newUser.fullName,
                // email: newUser.email,
                // followers: newUser.followers,
                // following: newUser.following,
                // profileImage: newUser.profileImage,
                // coverImage: newUser.coverImage,
                // bio: newUser.bio,
                // link: newUser.link
            })
        }

    } catch (error) {
        console.log(`signup error message: ${error}`)
        res.status(500).json({ error: `signup error message: ${error}` })
    }
}

//  login controller fn
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        // check if password match
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) return res.status(400).json({ error: `Invalid username ${username} or password` })

        //  generate token
        generateToken(user._id, res)

        res.status(200).json({ message: "Login successfully" })

    } catch (error) {
        console.log(`login error message: ${error}`)
        res.status(500).json({ error: `login error message: ${error}` })
    }
}

//  logout controller fn
export const logout = async (req, res) => {
    try {
        //  delete cookie
        res.cookie("jwt", '', { maxAge: 0 })
        res.status(200).json({ message: "Logout successfully" })
    } catch (error) {
        console.log(`logout error message: ${error}`)
        res.status(500).json({ error: `logout error message: ${error}` })
    }
}

//  get user
export const getUser = async (req, res) => {
    try {
        //  get user without password
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user )
    } catch (error) {
        console.log(`get user error message: ${error}`)
        res.status(500).json({ error: `get user error message: ${error}` })
    }
}