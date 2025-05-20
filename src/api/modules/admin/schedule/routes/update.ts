import express from 'express'

import { updateSchema } from '../validation/updateValidation'
import { ScheduleModel } from '../../../../../models/Schedule'
const router = express.Router()

type updateRequestDTO = {
	scheduleId: string
	timeslots: number[]
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
				return next(new Error(`Validation error \n ${error}`))
			}
			const { scheduleId, timeslots } = req.body

			const schedule = await ScheduleModel.findById(scheduleId)

			if (schedule) {
				const { acknowledged } = await schedule.updateOne({
					timeslots: timeslots,
				})

				if (acknowledged == true) {
					res.status(201).json({
						acknowledged: acknowledged,
					})
				} else {
					throw new Error('Update error')
				}
			} else {
				res.status(500)
				throw new Error('Cant fint schedule by id')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
