import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../../middlewares'

// import add from './routes/add'
import remove from './routes/delete'
import add from './routes/add'

const router = express.Router()

router.use('/add', authMiddleware, roleMiddleware(['USER']), add)
// router.use('/delete', authMiddleware, roleMiddleware(['USER']), remove)

export default router
