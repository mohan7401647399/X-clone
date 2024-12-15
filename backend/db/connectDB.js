import mongoose from 'mongoose'

//  Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`)
        process.exit(1)
    }
}

export default connectDB