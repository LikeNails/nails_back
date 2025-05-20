import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../../middlewares'

// import add from './routes/add'
// import update from './routes/update'

import add from './routes/add'
import update from './routes/update'
import remove from './routes/delete'

const router = express.Router()

router.use('/add', authMiddleware, roleMiddleware(['ADMIN']), add)
router.use('/update', authMiddleware, roleMiddleware(['ADMIN']), update)
router.use('/delete', authMiddleware, roleMiddleware(['ADMIN']), remove)
// router.use('/remove-master', authMiddleware, roleModdleware(['ADMIN']))

export default router
