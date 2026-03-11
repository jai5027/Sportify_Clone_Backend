import express from 'express'
import { createMusic } from '../controllers/music.controller.js'
import multer from 'multer'
import { createAlbum } from '../controllers/music.controller.js'
import { authMiddleware, getMusicMid }from '../middleware/auth.middleware.js'
import { getMusic, getAlbum, getAlbumById } from '../controllers/music.controller.js'

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', authMiddleware, upload.single("music"), createMusic)

router.post('/album', authMiddleware, createAlbum)

router.get('/', getMusicMid, getMusic)  

router.get('/albums', getMusicMid, getAlbum)

router.get('/album/:albumId', getMusicMid, getAlbumById)

export default router