import express from 'express'
<<<<<<< HEAD
import { registerUser } from '../controllers/auth.controller.js'
import { loginUser, logout } from '../controllers/auth.controller.js'
=======
import { registerUser, loginUser } from "../controllers/user.controller.js"
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

<<<<<<< HEAD
router.post('/logout', logout)

=======
>>>>>>> a4c94b0fc6dc463c73c16e953e637e6ff08cda25
export default router