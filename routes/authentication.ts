import express from 'express'
import { registerUser, loginUser } from '../services/authentication.service'
import { validateUserDetails } from '../middlewares/validate'

const router = express.Router()

router.post('/register', validateUserDetails, registerUser)
router.post('/login', loginUser)

export { router as authenticationRouter }