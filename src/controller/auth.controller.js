import mongoose from "mongoose";
import userModel from '../model/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

async function registerUser(req, res){

    const { username, email, password, role = 'user' } = req.body

    const isAlreadyUserExists = await userModel.findOne({
         $or: [
            {username: username},
            {email: email}
         ]
    })

    if(isAlreadyUserExists){
        return res.status(409).json({
            msg: "user already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
          username, email, password: hash, role
    })

    const token = jwt.sign({
          id: user._id,
          role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        msg: "user created successfully",
        user
    })
}

async function loginUser(req, res){

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            {username: username},
            {email: email}
        ]
    })

    if(!user){
        return res.status(401).json({
            msg: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            msg: "Invalid credentials"
        })
    }

    const token = jwt.sign({
           id: user._id,
           role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        msg: "user login successfully",
        user
    })


}

export { registerUser, loginUser }