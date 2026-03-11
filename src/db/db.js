import mongoose from "mongoose";

async function connectDB(){

    try {
        await mongoose.connect(process.env.DATABASE_STRING)
        console.log("DATABASE CONNECTED SUCCESSFULLY");
    } catch (error) {
     console.log("CONNECTION FAILED", error)
    }
}

export default connectDB