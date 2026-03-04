import musicModel from "../model/music.model.js";
import jwt from 'jsonwebtoken'
import uploadFile from "../services/storage.service.js";

async function createMusic(req, res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "admin"){
            return res.status(403).json({
                msg: "You don't have access to create music"
            })
        }
     
    const { title } = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString("base64"))

    const music = await musicModel.create({
          uri: result.url,
          title,
          artist: decoded.id
    }) 

    res.status(201).json({
        msg: "Music created successfully",
        music
    })

     } catch (error) {
        return res.status(401).json({
            msg: "Unauthorized"
        })
    }   
}

export default createMusic