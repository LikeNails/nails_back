import { getConnection } from '../api/utils/db'
import { RoleModel, RoleType } from '../models/Role'
require('dotenv').config()

const userValue = 'USER'
const adminValue = 'ADMIN'
const masterValue = 'MASTER'

import mongoose from 'mongoose'

const rolesPreload = async (): Promise<void> => {
	const conn = getConnection()

	const userRole = new RoleModel({ value: userValue })
	const adminRole = new RoleModel({ value: adminValue })
	const masterRole = new RoleModel({ value: masterValue })

	try {
		await userRole.save()
	} catch (error) {
		console.log(`Ошибка при сохранении роли пользователя \n ${error}`)
	}

	try {
		await adminRole.save()
	} catch (error) {
		console.log(`Ошибка при сохранение роли администратора \n ${error}`)
	}

	try {
		await masterRole.save()
	} catch (error) {
		console.log(`Ошибка при сохранение роли мастера \n ${error}`)
	}

	mongoose.connection.close()
}

rolesPreload()
