import express, { NextFunction } from 'express'
import { UserModel } from '../../models/User'

const router = express.Router()

type LogoutResponse = {
	message: string
}

router.post(
	'',
	async (
		req: express.Request,
		res: express.Response<LogoutResponse>,
		next: NextFunction,
	) => {
		try {
			const { id } = req.user!
			console.log(id)
			const user = await UserModel.findById(id)
			console.log(user)
			if (user) {
				user.refresh_token = null
				await user.save()
				res.status(200).json({ message: 'Logged out successfully' })
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
