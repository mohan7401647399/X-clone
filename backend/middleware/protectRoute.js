import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

//  protect route
const protectRoute = async (req, res, next) => {
    try {
        //  check if user is logged in
        const token = req.cookies.jwt
        if (!token) return res.status(404).json({ error: "You are not logged in: token not found" })

        //  check if token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) return res.status(404).json({ error: "Your are not logged in: Invalid token" })

        //  get user
        const user = await User.findOne({ _id: decoded.userId }).select("-password")
        if (!user) return res.status(404).json({ error: "Your are not logged in: user not found" })

        //  add user to request
        req.user = user
        //  call next middleware
        next()
    
    } catch (error) {
        console.log(`protect route error message: ${error}`)
        res.status(500).json({ error: `protect route error message: ${error}` })
    }
}

export default protectRoute