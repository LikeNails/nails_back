import express from 'express'
import MonthModel, {
	MonthType,
	CalenderDay,
	MonthNames,
} from '../../../../../models/Month'
import { deleteMonthSchema } from '../validation/deleteMonthValidation'
import { monthDaysCountCheck } from '../../../../utils/utils'
import { UserModel } from '../../../../../models/User'
const router = express.Router()

type deleteMonthRequestDTO = {
	monthId: string
}

type deleteMonthResponseDTO = {
	acknowledged: boolean
	deletedCount: number
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, deleteMonthRequestDTO>,
		res: express.Response<deleteMonthResponseDTO>,
		next: express.NextFunction,
	) => {
		try {
			const { error } = deleteMonthSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { monthId } = req.body
			const month = await MonthModel.findById(monthId)

			if (!month) {
				res.status(500)
				throw new Error('Cant find month by id')
			} else {
				const { acknowledged, deletedCount } = await month.deleteOne()
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
