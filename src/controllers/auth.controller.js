import userModel from '../model/auth.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function registerUser(req, res){

    const { username, email, password, role = 'user' } = req.body

        if(!username || !email || !password){
        return res.status(400).json({
            msg: "All fields are required"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[ {username}, {email} ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            msg: "user already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
          username,
          email,
          password: hash,
          role
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
         $or:[ {username}, {email} ]
    })

    if(!user){
        return res.status(404).json({
            msg: "User not found"
        })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
        return res.status(401).json({
            msg: "Invalid Password"
        })
    }

    const token = jwt.sign({
          id: user._id,
          role: user.role    
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        msg: "user logined successfully",
        user
    })

}

async function logout(req, res){

    res.clearCookie("token")
    res.status(200).json({
        msg: "user logout successfully"
    })
}

export { registerUser, loginUser, logout }