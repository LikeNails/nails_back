import express from 'express'
import { authMiddleware, roleMiddleware } from '../../../../middlewares'

import add from './routes/add'
import update from './routes/update'
// import delete from './routes/delete'
// import uploadImage from './routes/uploadImage'
import getAll from './routes/getAll'
import getBinds from './routes/getBinds'

const router = express.Router()

router.use('/add', authMiddleware, roleMiddleware(['ADMIN']), add)
router.use('/update', authMiddleware, roleMiddleware(['ADMIN']), update)
// router.use('/delete', authMiddleware, roleMiddleware(['ADMIN']), delete)
// router.use(
// 	'/upload-image',
// 	authMiddleware,
// 	roleMiddleware(['ADMIN']),
// 	uploadImage,
// )
router.use('/get-all', authMiddleware, roleMiddleware(['ADMIN']), getAll)
router.use('/get-binds', authMiddleware, roleMiddleware(['ADMIN']), getBinds)

export default router
