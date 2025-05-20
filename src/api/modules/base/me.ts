import express, { NextFunction } from 'express'
import { UserModel } from '../../../models/User'

const router = express.Router()

router.post(
	'',
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { id } = req.user!
			console.log(id)
			const user = await UserModel.findById(id)

			if (user) {
				res.status(200).json(user)
			} else {
				throw new Error('Пользователь не найден')
			}
		} catch (error) {
			res.status(500)
			return next(new Error(`Can't logout \n ${error}`))
		}
	},
)

export default router
