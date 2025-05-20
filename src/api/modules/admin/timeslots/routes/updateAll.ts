import express from 'express'

import { updateSchema } from '../validation/updateValidation'
import { ServiceModel } from '../../../../../models/Service'
import { TimeslotModel } from '../../../../../models/Timeslot'
const router = express.Router()

type TimeslotT = {
	value: string
	order: number
}

type updateRequestDTO = {
	timeslots: TimeslotT[]
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, updateRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = updateSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { timeslots } = req.body

			let out = []
			if (timeslots) {
				for (let timeslot of timeslots) {
					const { order, value } = timeslot
					const timeslotModel = await TimeslotModel.findOne({
						order: order,
					})
					if (timeslotModel) {
						const { acknowledged, modifiedCount } =
							await timeslotModel.updateOne({
								value: value,
							})
						out.push({
							acknowledged: acknowledged,
							modifiedCount: modifiedCount,
						})
					}
				}
				res.status(201).json(out)
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
