import adminLogin from './adminLogin'
import express from 'express'
import masterRouter from './master/index'
import masterImageRouter from './masterImage/index'
import serviceRouter from './service/index'
import monthRouter from './month/index'
import timeslotsRouter from './timeslots/index'
import offerRouter from './offer/index'
import scheduleRouter from './schedule/index'
import getAll from './getAll/getAll'
import masterServicePriceRouter from './masterServicePrice/index'

const router = express.Router()

import { authMiddleware, roleMiddleware } from '../../../middlewares'
router.use('/admin-login', adminLogin)
router.use('/month', monthRouter)
router.use('/master', masterRouter)
router.use('/master-image', masterImageRouter)
router.use('/service', serviceRouter)
router.use('/schedule', scheduleRouter)
router.use('/offer', offerRouter)
router.use('/timeslots', timeslotsRouter)
router.use('/get-all', authMiddleware, roleMiddleware(['ADMIN']), getAll)
router.use('/master-service-price', masterServicePriceRouter)
export default router
