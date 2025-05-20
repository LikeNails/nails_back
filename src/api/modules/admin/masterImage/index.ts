import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../../middlewares'

// import add from './routes/add'
// import update from './routes/update'
// import delete from './routes/delete'
import uploadImage from './routes/add'

const router = express.Router()

router.use('/add', authMiddleware, roleMiddleware(['ADMIN']), uploadImage)
// router.use('/remove-master', authMiddleware, roleModdleware(['ADMIN']))

export default router
