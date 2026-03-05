import express from 'express'
import registerRouter from './router/auth.router.js'
import cookieParser from 'cookie-parser'
import musicRouter from './router/music.router.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', registerRouter)
app.use('/api/music', musicRouter)

export default app