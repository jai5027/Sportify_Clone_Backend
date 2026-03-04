import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
      username: { type: String, require: true, unique: true },
      email: { type: String, require: true, unique: true },
      password: { type: String, require: true },
      role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
      }
})

const userModel = mongoose.model("user", usersSchema)

export default userModel