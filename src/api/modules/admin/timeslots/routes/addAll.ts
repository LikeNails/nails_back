import express from 'express'

import { addSchema } from '../validation/addValidation'
import { ServiceModel } from '../../../../../models/Service'
import TimeslotModel from '../../../../../models/Timeslot'
const router = express.Router()

type TimeslotT = {
	start: string
	end: string
	order: number
}

type addRequestDTO = {
	timeslots: TimeslotT[]
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, addRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = addSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { timeslots } = req.body
			let timeslotsToExport = []
			if (timeslots) {
				for (let timeslot of timeslots) {
					const { order, start, end } = timeslot
					const timeslotIdentity = await TimeslotModel.exists({
						order: order,
					})
					if (timeslotIdentity) {
						throw new Error('Already exists')
					} else {
						const timeslotModel = new TimeslotModel({
							order: order,
							start: start,
							end: end,
						})

						await timeslotModel.save()
						timeslotsToExport.push(timeslotModel)
					}
				}
				res.status(201).json(timeslotsToExport)
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
