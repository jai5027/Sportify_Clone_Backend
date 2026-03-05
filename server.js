import app from './src/app.js'
import dotenv from 'dotenv'
import connectDB from './src/db/db.js'

dotenv.config()
connectDB()
app.listen(4000, () => {
    console.log("server running on http://localhost:4000");
    
})