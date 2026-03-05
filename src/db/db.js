import mongoose from "mongoose";

async function connectDB(){
    try {

    await mongoose.connect(process.env.DATABASE_STRING)
    console.log("Database connected successfully")

        } catch (error) {
        console.log("Connection Failed", error)
    }
}

export default connectDB