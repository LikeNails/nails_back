import express, { NextFunction } from 'express'
import {
	UserModel,
	UserType,
	getAllMasterBinds,
} from '../../../../../models/User'
import { masterDeleteSchema } from '../validation/deleteValidation'

type MasterDeleteResponse = {
	status: boolean
}

type MasterDeleteRequest = {
	masterId: string
}

const router = express.Router()

router.post(
	'',
	async (
		req: express.Request<{}, {}, MasterDeleteRequest>,
		res: express.Response<MasterDeleteResponse>,
		next: NextFunction,
	) => {
		try {
			const { error } = masterDeleteSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}

			const { masterId } = req.body

			const existingMaster = await UserModel.findById(masterId)
			if (!existingMaster) {
				res.status(400)
				return next(new Error('Master is not found'))
			} else {
				const { schedule, monthes, masterImage, masterServicePrices } =
					await getAllMasterBinds(masterId)

				let deletePromises = []
				if (schedule) {
					deletePromises.push(schedule.deleteOne())
				}

				if (monthes) {
					for (const month of monthes) {
						deletePromises.push(month.deleteOne())
					}
				}

				if (masterImage) {
					deletePromises.push(masterImage.deleteOne())
				}

				if (masterServicePrices) {
					for (const masterService of masterServicePrices) {
						deletePromises.push(masterService.deleteOne())
					}
				}

				await Promise.allSettled(deletePromises)
			}

			res.status(201).json({ status: true })
		} catch (error) {
			res.status(500)
			return next(new Error(`Server error \n ${error}`))
		}
	},
)

export default router
