import app from './src/app.js'
import dotenv from 'dotenv'
import connectDB from './src/db/db.js'

dotenv.config()
connectDB()
<<<<<<< HEAD
app.listen(4000, () => {
    console.log("server running on http://localhost:4000");
=======

app.listen(3000, () => {
    console.log(3000);
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25
    
})