import mongoose from "mongoose";

async function connectDB(){

    try {
    await mongoose.connect(process.env.DATABASE_STRING)
     console.log("DATABASE CONNECTED")    

    } catch (error) {
     console.log("Connection Failed")   
    }
}

export default connectDB
