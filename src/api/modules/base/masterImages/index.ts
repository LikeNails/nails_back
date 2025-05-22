import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../../middlewares'

// import add from './routes/add'
// import remove from './routes/delete'
// import add from './routes/add'
import getAll from './routes/get'

const router = express.Router()

router.use('/get', authMiddleware, roleMiddleware(['USER']), getAll)
// router.use('/delete', authMiddleware, roleMiddleware(['USER']), remove)

export default router
