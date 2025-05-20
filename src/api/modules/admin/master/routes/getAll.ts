import express, { NextFunction } from 'express'
import { UserModel, UserType } from '../../../../../models/User'
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../../../../api/utils/generateToken'

import RoleModel, { RoleType } from '../../../../../models/Role'

type GetAllResponse = {
	masters: UserType[]
}
const router = express.Router()

router.post(
	'',
	async (
		req: express.Request,
		res: express.Response<GetAllResponse>,
		next: NextFunction,
	) => {
		try {
			const masterRole = await RoleModel.findOne({ value: 'MASTER' })
			if (!masterRole) {
				throw new Error('Master role is not created yet')
			}
			const adminRole = await RoleModel.findOne({ value: 'ADMIN' })
			if (!adminRole) {
				throw new Error('Admin role is not created yet')
			}
			const masters = await UserModel.find({
				$and: [
					{ roles: masterRole._id },
					{ roles: { $ne: adminRole._id } },
				],
			})
			res.status(201).json({ masters: masters })
		} catch (error) {
			res.status(500)
			return next(new Error(`Server error \n ${error}`))
		}
	},
)

export default router
