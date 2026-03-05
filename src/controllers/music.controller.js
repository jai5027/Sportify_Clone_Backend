import musicModel from "../model/music.model.js";
import jwt, { decode } from 'jsonwebtoken'
import uploadFile from '../services/storage.service.js'
import albumModel from "../model/album.model.js";

async function createMusic(req, res) {

    const { title } = req.body
    const file = req.file   

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
          uri: result.url,
          title,
          artist: req.user.id
    })

    res.status(201).json({
        msg: "music created successfully",
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
            msg: "ablum created successfully",
            album:{
                id: album.id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })
}

async function getMusic(req, res){

    const AllMusics = await musicModel.find().limit(2).populate("artist", "username email")

    res.status(200).json({
        msg: "ALL MUSICS",
        AllMusics
    })
}

async function getAlbums(req, res){

    const albums = await albumModel.find().select("title artist").populate("artist", "username email")

    res.status(200).json({
        msg: "Music Album Fetch successfully",
        albums: albums
    })
}

async function getAlbumById(req, res){

    const albumId = req.params.albumId

    const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

    res.status(200).json({
        msg: "Album fetch successfully",
        album: album
    })
}

export { createMusic, createAlbum, getMusic, getAlbums, getAlbumById }
