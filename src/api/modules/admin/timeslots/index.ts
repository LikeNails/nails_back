import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../../middlewares'

// import add from './routes/add'
import update from './routes/updateAll'
import remove from './routes/delete'
import add from './routes/addAll'

const router = express.Router()

router.use('/add-all', authMiddleware, roleMiddleware(['ADMIN']), add)
router.use('/update-all', authMiddleware, roleMiddleware(['ADMIN']), update)
router.use('/delete', authMiddleware, roleMiddleware(['ADMIN']), remove)

export default router
