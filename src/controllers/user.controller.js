import userModel from '../model/model.schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function registerUser(req, res){

    const { username, email, password, role = 'user' } = req.body
    
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            msg: 'user already exists'
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

    const { username, password, email } = req.body

    const user = await userModel.findOne({
        $or: [{ username },
              { email }
        ]
    })

    if(!user){
        return res.status(401).json({
            msg: "invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            msg: "invalid credenrials"
        })
    }

    const token = jwt.sign({
          id: user._id,
          role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        msg: "user logged in successfully",
        user
    })
}

export { registerUser, loginUser }