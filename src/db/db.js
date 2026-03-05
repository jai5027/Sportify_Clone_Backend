import mongoose from "mongoose";

async function connectDB(){
<<<<<<< HEAD
    try {

    await mongoose.connect(process.env.DATABASE_STRING)
    console.log("Database connected successfully")

        } catch (error) {
        console.log("Connection Failed", error)
    }
}

export default connectDB
=======

    try {
    await mongoose.connect(process.env.DATABASE_STRING)
     console.log("DATABASE CONNECTED")    

    } catch (error) {
     console.log("Connection Failed")   
    }
}

export default connectDB
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25
