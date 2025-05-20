import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../../middlewares'

// import add from './routes/add'
import remove from './routes/delete'
import add from './routes/add'
import getAll from './routes/getAll'

const router = express.Router()

router.use('/add', authMiddleware, roleMiddleware(['ADMIN']), add)
router.use('/delete', authMiddleware, roleMiddleware(['ADMIN']), remove)
router.use('/get-all', authMiddleware, roleMiddleware(['ADMIN']), getAll)

export default router
