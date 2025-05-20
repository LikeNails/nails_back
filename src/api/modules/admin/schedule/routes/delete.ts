import express from 'express'

import { deleteSchema } from '../validation/deleteValidation'
import ScheduleModel from '../../../../../models/Schedule'

const router = express.Router()

type deleteRequestDTO = {
	scheduleId: string
}

type deleteResponseDTO = {
	acknowledged: boolean
	deletedCount: number
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, deleteRequestDTO>,
		res: express.Response<deleteResponseDTO>,
		next: express.NextFunction,
	) => {
		try {
			const { error } = deleteSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { scheduleId } = req.body
			const schedule = await ScheduleModel.findById(scheduleId)

			if (!schedule) {
				res.status(500)
				throw new Error('Cant find schedule by id')
			} else {
				const { acknowledged, deletedCount } =
					await schedule.deleteOne()
				res.status(201)
				res.json({
					acknowledged: acknowledged,
					deletedCount: deletedCount,
				})
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
