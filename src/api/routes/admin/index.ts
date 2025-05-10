import masterRegistration from '../admin/masterRegister/masterRegister'
import adminLogin from '../admin/adminLogin'
import addMonth from '../admin/addMonth/addMonth'
import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../middlewares'

const router = express.Router()

router.use('/admin-login', adminLogin)
router.use('/add-month', authMiddleware, roleMiddleware(['ADMIN']), addMonth)
router.use(
	'/master-registration',
	authMiddleware,
	roleMiddleware(['ADMIN']),
	masterRegistration,
)

export default router
