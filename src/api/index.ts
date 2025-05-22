import express from 'express'
import login from './modules/base/login/login'
import logout from './modules/base/logout'
import refresh from './modules/base/refresh'
import register from './modules/base/register/register'
import test from './modules/base/test'
import testb from './modules/base/testb'
import confirmEmail from './modules/base/emailConfirm/emailConfirm'
import adminRouter from './modules/admin/index'
import offerRouter from './modules/base/offer/index'
import { authMiddleware, roleMiddleware } from '../middlewares'
import masterRouter from './modules/base/master/index'
import meRouter from './modules/base/me'
import masterImageRouter from './modules/base/masterImages'
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
router.use('/offer', offerRouter)
router.use('/master', masterRouter)
router.use(
	'/me',
	authMiddleware,
	roleMiddleware(['USER', 'ADMIN', 'MASTER']),
	meRouter,
)

router.use('/master-image', masterImageRouter)

export default router
