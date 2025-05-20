import express, { NextFunction } from 'express'
import { UserModel } from '../../../../models/User'
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../../utils/generateToken'
import { loginSchema } from './loginValidation'
const router = express.Router()

type LoginRequestBody = {
	email: string
	password: string
}

type LoginResponse = {
	accessToken: string
	refreshToken: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, LoginRequestBody>,
		res: express.Response<LoginResponse>,
		next: NextFunction,
	) => {
		try {
			const { error } = loginSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}

			const { email, password } = req.body
			const user = await UserModel.findOne({ email })
			if (!user) {
				res.status(401)
				return next(new Error('Uncorrect email or password'))
			}

			const isMatch = await user.comparePassword(password)
			if (!isMatch) {
				res.status(401)
				return next(new Error('Uncorrect email or password'))
			}
			const accessToken = generateAccessToken(user.id)
			const refreshToken = generateRefreshToken(user.id)

			user.refresh_token = refreshToken
			await user.save()

			res.json({ accessToken, refreshToken })
		} catch (error) {
			res.status(500)
			return next(new Error(`Server error \n ${error}`))
		}
	},
)

export default router
