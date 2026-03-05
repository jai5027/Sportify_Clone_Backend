import express from 'express'
<<<<<<< HEAD
import { createMusic } from '../controllers/music.controller.js'
import { createAlbum, getMusic, getAlbums, getAlbumById } from '../controllers/music.controller.js'
import { authArtist, getUser } from '../middlewares/auth.middleware.js'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post('/upload', authArtist, upload.single("music"), createMusic)

router.post('/album', authArtist, createAlbum)

router.get('/', getUser, getMusic)
router.get('/albums', getUser, getAlbums)
router.get('/albums/:albumId', getUser, getAlbumById)
=======
import createMusic from '../controllers/music.controller.js'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() })
 
const router = express.Router()

router.post('/upload', upload.single('music'), createMusic)
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25

export default router