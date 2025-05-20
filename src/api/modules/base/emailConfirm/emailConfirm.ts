import express from 'express'
import { NextFunction, Request, Response } from 'express'
import { UserModel, UserType } from '../../../../models/User'
import { RoleModel, RoleType } from '../../../../models/Role'

const router = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	delete req.headers.origin

	const { token } = req.params

	try {
		const user: UserType | null = await UserModel.findOne({
			email_confirm_token: token,
		})

		if (!user) {
			res.status(400)
			return next(new Error(`Неверный токен, ${token}`))
		}

		const userRole: RoleType | null = await RoleModel.findOne({
			value: 'USER',
		})

		if (!userRole) {
			res.status(500)
			return next(new Error('Роль USER не создана'))
		}

		if (user.roles && user.roles.includes(userRole.id)) {
			res.status(201).json(true)
			return
		}
		user.roles = [...(user.roles || []), userRole.id]

		await user.save()

		res.status(201).json(true)
	} catch (error) {
		console.error(error)
		res.status(500)
		return next(new Error(`Ошибка при подтверждении почты ${error}`))
	}
}

export default router
