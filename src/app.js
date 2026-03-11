import express from 'express'
import authRouter from './router/auth.router.js'
import musicRouter from './router/music.router.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use('/api/auth', authRouter)
app.use('/api/music', musicRouter)

export default app