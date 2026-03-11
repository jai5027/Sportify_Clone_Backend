import userModel from '../models/auth.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function registerUser(req, res){

    const { username, email, password, role = "user" } = req.body

    const isUserAlreadyExists = await userModel.findOne({
          $or: [ { username }, { email }]
    })

    if(isUserAlreadyExists) {
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
        msg: "user register successfully",
        user,
        token
    })
}

async function loginUser(req, res){

    const { identifier, password } = req.body

    const user = await userModel.findOne({
          $or: [ {username: identifier}, {email: identifier} ]
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
        msg : "login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        } 
    })
}

async function logoutUser(req, res){
    res.clearCookie("token")

    return res.status(200).json({
        msg: "Logout successfully"
    })
}

export { registerUser, loginUser, logoutUser }