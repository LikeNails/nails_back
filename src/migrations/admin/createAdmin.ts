import express, { NextFunction } from 'express'
import { UserModel, UserType } from '../../models/User'
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../api/utils/generateToken'
import { sendConfirmationMail } from '../../api/utils/mail/sendEmail'
import RoleModel, { RoleType } from '../../models/Role'
import { getRole } from '../../api/utils/utils'
import { getConnection } from '../../api/utils/db'
import mongoose from 'mongoose'

const router = express.Router()

const createAdmin = async (
	adminEmail: string,
	password: string,
): Promise<void> => {
	const conn = getConnection()
	try {
		const existingUser = await UserModel.findOne({ email: adminEmail })
		if (existingUser) {
			throw new Error('Такой администратор уже создан')
		}

		const user = new UserModel({
			email: adminEmail,
			password,
			phone_number: '89000000000',
			first_name: 'admin',
			family_name: 'admin',
		})

		const adminRole: RoleType | null = await getRole('ADMIN')

		const masterRole: RoleType | null = await getRole('MASTER')

		const userRole: RoleType | null = await getRole('USER')

		if (userRole && masterRole && adminRole) {
			user.roles = [
				...(user.roles || []),
				userRole.id,
				masterRole.id,
				adminRole.id,
			]
		} else {
			throw new Error('В базе данных не созданы роли')
		}

		const refreshToken = generateRefreshToken(user.id)

		const email_confirm_token = Math.random().toString(36).split('.')[1]

		user.email_confirm_token = email_confirm_token
		user.refresh_token = refreshToken

		await user.save()

		console.log('Админ создан')
	} catch (error) {
		console.log(new Error(`Server error \n ${error}`))
	}
	mongoose.connection.close()
}
export default router

createAdmin('admin', 'admin')
