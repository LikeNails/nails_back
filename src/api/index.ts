import express from 'express'
import login from './routes/login/login'
import logout from './routes/logout'
import refresh from './routes/refresh'
import register from './routes/register/register'
import test from './routes/test'
import testb from './routes/testb'
import confirmEmail from './routes/emailConfirm/emailConfirm'
import adminRouter from './routes/admin/index'

import { authMiddleware, roleMiddleware } from '../middlewares'

const router = express.Router()

router.use('/admin', adminRouter)
router.use('/login', login)
router.use('/register', register)
router.get('/confirm-email/:token', confirmEmail)
router.use(
	'/logout',
	authMiddleware,
	roleMiddleware(['USER', 'ADMIN', 'MASTER']),
	logout,
)
router.use('/refresh', refresh)
router.use('/test', test)
router.use('/testb', testb)

export default router
