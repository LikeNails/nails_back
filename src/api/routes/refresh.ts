import express, { NextFunction } from 'express'
import { UserModel } from '../../models/User'
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateToken'
import { JwtPayload } from 'jsonwebtoken'

const router = express.Router()

router.post(
	'',
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { refresh_token } = req.body
			console.log(refresh_token)
			if (!refresh_token) {
				res.status(401)
				return next(new Error('No refresh token provided'))
			}
			const user = await UserModel.findOne({ refresh_token })
			if (!user) {
				res.status(403)
				return next(new Error('Invalid refresh token'))
			}
			// console.log(user)

			try {
				const decoded = jwt.verify(
					refresh_token,
					process.env.REFRESH_TOKEN_SECRET!,
				) as JwtPayload
				if (decoded && decoded.user_id === user.id.toString()) {
					const newAccessToken = generateAccessToken(user.id)
					res.json({ access_token: newAccessToken })
				} else {
					throw new Error('Invalid token')
				}
			} catch (err) {
				res.status(403)
				next(new Error(`Invalid or expired refresh token \n ${err}`))
			}
		} catch (error) {
			res.status(500)
			return next(new Error('Server error'))
		}
	},
)

export default router
