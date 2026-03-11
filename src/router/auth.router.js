import express from 'express'
import { logoutUser, registerUser } from '../controllers/auth.controller.js'
import { loginUser } from '../controllers/auth.controller.js'
import { registerUserValidationRules } from '../middleware/validation.middleware.js'    

const router = express.Router()

router.post('/register', registerUserValidationRules, registerUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)

export default router