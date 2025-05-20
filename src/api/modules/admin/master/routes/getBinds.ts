import express, { NextFunction } from 'express'
import {
	UserModel,
	UserType,
	MasterBinds,
	getAllMasterBinds,
} from '../../../../../models/User'
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../../../utils/generateToken'

import RoleModel, { RoleType } from '../../../../../models/Role'

import { getBindibgsValidateSchema } from '../validation/getBindingsValidation'

type GetBindsRequest = {
	masterId: string
}
type GetBindsResponse = {
	masterId: string
	binds: MasterBinds
}
const router = express.Router()

router.post(
	'',
	async (
		req: express.Request<{}, {}, GetBindsRequest>,
		res: express.Response<GetBindsResponse>,
		next: NextFunction,
	) => {
		try {
			const { error } = getBindibgsValidateSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				res.status(400)
				return next(new Error(`Validation error ${error}`))
			}
			console.log(req.body.masterId)
			const master = await UserModel.findById(req.body.masterId)
			if (!master) {
				res.status(500)
				throw new Error(`Cant find master`)
			}

			const binds = await getAllMasterBinds(req.body.masterId)

			res.status(201).json({ masterId: req.body.masterId, binds: binds })
		} catch (error) {
			res.status(500)
			return next(new Error(`${error}`))
		}
	},
)

export default router
