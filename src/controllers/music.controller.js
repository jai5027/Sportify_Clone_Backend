import musicModel from "../models/music.router.js";
import jwt, { decode } from 'jsonwebtoken'
import uploadFlie from "../services/storage.service.js";
import albumModel from "../models/album.model.js";

async function createMusic(req, res){
    
    const { title } = req.body
    const file =  req.file

    if(!file){
        return res.status(400).json({
            msg: "Music file is required"
        })
    }

    const result = await uploadFlie(file.buffer.toString("base64"))

    const music = await musicModel.create({
          uri: result.url,
          title,
          artist: req.user.id
    })

    res.status(201).json({
        msg: "music cretaed successfully",
        music
    })
}

async function createAlbum(req, res){
        
        const { title, musics } = req.body

        const album = await albumModel.create({
              title,
              artist: req.user.id,
              musics: musics
        })

        res.status(201).json({
            msg: "Album created Succefully",
            album
        })
}

async function getMusic(req, res){

    const AllSongs = await musicModel.find().limit(1).populate("artist", "username email")

    res.status(200).json({
        msg: "Music Fetch Successfully",
        AllSongs: AllSongs
    })
 }

async function getAlbum(req, res){

    const albums = await albumModel.find().select("title artist").populate("artist", "username email")

    res.status(200).json({
        msg: "All Albums",
        albums: albums
    })
} 

async function getAlbumById(req, res){

    const albumId = req.params.albumId

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

    return res.status(200).json({
        msg: "album fetch successfully",
        album: album
    })
}

export { createMusic, createAlbum, getMusic, getAlbum, getAlbumById }