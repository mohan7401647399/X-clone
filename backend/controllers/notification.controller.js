import Notification from "../model/notification.model.js"

//  get notification
export const getNotifications = async (req, res) => {
    try {
        const userId = req._id
        //  get notification
        const notification = await Notification.find({ to: userId }).populate({ path: "from", select: "username profileImage" })
        //  mark notification as read
        await Notification.updateMany({ to: userId }, { read: true })
        res.status(200).json({ notification })
    } catch (error) {
        console.log(`get notification error message: ${error}`)
        res.status(500).json({ error: `get notification error message: ${error}` })
    }
}

//  delete notification
export const deleteNotification = async (req, res) => {
    try {
        const userId = req.user._id
        //  delete notification
        await Notification.deleteMany({ to: userId })
        res.status(200).json({ message: "Notification deleted successfully" })
    } catch (error) {
        console.log(`delete notification error message: ${error}`)
        res.status(500).json({ error: `delete notification error message: ${error}` })
    }
}

