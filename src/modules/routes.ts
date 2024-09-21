import express from 'express'
import authRouter from './auth/auth.routes'
import userRouter from './user/user.routes'

const router = express.Router()

// Mounting the routes
router.use('/auth', authRouter)
router.use('/users', userRouter)

export default router
