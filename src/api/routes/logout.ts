import express, { NextFunction } from 'express'
import { User } from '../../models/User'

const router = express.Router()

type LogoutRequestBody = {
	refresh_token: string
}

type LogoutResponse = {
	message: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, LogoutRequestBody>,
		res: express.Response<LogoutResponse>,
		next: NextFunction,
	) => {
		try {
			const { refresh_token } = req.body

			if (!refresh_token) {
				res.status(400)
				return next(new Error('No refresh token provided'))
			}

			const user = await User.findOne({ refresh_token })
			if (user) {
				user.refresh_token = null
				await user.save()
			}

			res.status(200).json({ message: 'Logged out successfully' })
		} catch (error) {
			res.status(500)
			return next(new Error('Server error'))
		}
	},
)

export default router
