import express from 'express'

import { deleteSchema } from '../validation/deleteValidation'
import { TimeslotModel } from '../../../../../models/Timeslot'

const router = express.Router()

type deleteRequestDTO = {
	timeslotId: string
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
			const { timeslotId } = req.body

			const timeslot = await TimeslotModel.findById(timeslotId)

			if (timeslot) {
				const { acknowledged, deletedCount } = timeslot.deleteOne()
				res.status(201).json({
					acknowledged: acknowledged,
					deletedCount: deletedCount,
				})
			} else {
				throw new Error('Cant find timeslot to delete')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
