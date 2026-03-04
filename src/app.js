import express from 'express'
import cookieParser from 'cookie-parser'
import router from './router/auth.router.js'
import musicRouter from './router/music.router.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', router)
app.use('/api/music', musicRouter)

export default app