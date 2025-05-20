import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../../middlewares'

import getMasterFreeSlotsRouter from './routes/getMasterFreeSlots'
import getMasterServices from './routes/getMasterServices'
import getMastersRouter from './routes/getMasters'

const router = express.Router()

router.use(
	'/get-master-free-slots',
	authMiddleware,
	roleMiddleware(['USER']),
	getMasterFreeSlotsRouter,
)

router.use('/get-masters', getMastersRouter)

router.use('/get-master-services', getMasterServices)

export default router
