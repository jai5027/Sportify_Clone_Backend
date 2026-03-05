import express from 'express'
<<<<<<< HEAD
import registerRouter from './router/auth.router.js'
import cookieParser from 'cookie-parser'
=======
import cookieParser from 'cookie-parser'
import router from './router/auth.router.js'
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25
import musicRouter from './router/music.router.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

<<<<<<< HEAD
app.use('/api/auth', registerRouter)
=======
app.use('/api/auth', router)
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25
app.use('/api/music', musicRouter)

export default app