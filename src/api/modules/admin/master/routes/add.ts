import express, { NextFunction } from 'express'
import { UserModel, UserType } from '../../../../../models/User'
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../../../../api/utils/generateToken'
import { registerSchema } from '../../../base/register/registerValidation'
import { sendConfirmationMail } from '../../../../utils/mail/sendEmail'
import RoleModel, { RoleType } from '../../../../../models/Role'

const router = express.Router()

router.post(
	'',
	async (
		req: express.Request<{}, {}, UserType>,
		res: express.Response,
		next: NextFunction,
	) => {
		try {
			const { error } = registerSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Validation error \n ${error}`))
			}

			const { email, password, phone_number, first_name, family_name } =
				req.body

			const existingUser = await UserModel.findOne({ email })
			if (existingUser) {
				res.status(400)
				return next(new Error('User is already created'))
			}

			const user = new UserModel({
				email,
				password,
				phone_number,
				first_name,
				family_name,
			})

			const userRole: RoleType | null = await RoleModel.findOne({
				value: 'MASTER',
			})

			if (userRole) {
				user.roles = [...(user.roles || []), userRole.id]
			} else {
				throw new Error('Роль мастера не создана в базе данных')
			}

			const accessToken = generateAccessToken(user.id)
			const refreshToken = generateRefreshToken(user.id)

			const email_confirm_token = Math.random().toString(36).split('.')[1]

			const confirmationMail = `http://127.0.0.1:3000/api/v1/confirm-email/${email_confirm_token}`

			const confirmationSend = await sendConfirmationMail(
				confirmationMail,
				email,
			)

			if (!confirmationSend) {
				return next(
					new Error('Не удалось отправить письмо подтверждения'),
				)
			}

			user.email_confirm_token = email_confirm_token
			user.refresh_token = refreshToken

			if (await user.save()) {
				res.status(201).json(user)
			}

			res.status(201).json({ status: true })
		} catch (error) {
			res.status(500)
			return next(new Error(`Server error \n ${error}`))
		}
	},
)

export default router
