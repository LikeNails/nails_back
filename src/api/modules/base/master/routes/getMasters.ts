import express from 'express'

import { UserModel } from '../../../../../models/User'
import { RoleModel } from '../../../../../models/Role'
const router = express.Router()

type RequestDTO = {
	masterId: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, RequestDTO>,
		res: express.Response,
		next: express.NextFunction,
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
			next(error)
		}
	},
)

export default router
