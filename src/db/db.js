import mongoose from "mongoose";

async function connectDB(){

    try {

    await mongoose.connect(process.env.DATABASE_STRING)
    console.log("Database Connected")

     } catch (error) {
        console.log("connection failed", error)
    }
}

export default connectDB

