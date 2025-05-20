import express from 'express'
import { updateMonthSchema } from '../validation/updateMonthValidation'
import MonthModel from '../../../../../models/Month'
import { CalenderDay, MonthNames } from '../../../../../models/Month'
import { monthDaysCountCheck } from '../../../../utils/utils'
import { model } from 'mongoose'
const router = express.Router()

type updateMonthRequestDTO = {
	calender_days?: CalenderDay[]
	year?: number
	name: MonthNames
	monthId: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, updateMonthRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = updateMonthSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { monthId, calender_days, year, name } = req.body
			const month = await MonthModel.findById(monthId)
			const model: updateMonthRequestDTO = {
				name: name,
				monthId: monthId,
			}
			if (!month) {
				res.status(500)
				throw new Error('Cant find month by id')
			} else {
				if (calender_days !== undefined) {
					if (
						monthDaysCountCheck({
							month_name: name,
							calender_days: calender_days,
							year: year !== undefined ? year : 2025,
						})
					) {
						model.calender_days = calender_days
					} else {
						throw new Error('Uncorrect month days count')
					}
				}

				if (year !== undefined) {
					model.year = year
				}

				if (year == undefined && calender_days == undefined) {
					throw new Error('No data for update')
				}
				const { acknowledged } = await month.updateOne({
					calender_days: calender_days,
					year: year,
				})
				if (acknowledged == true) {
					res.status(201).json({ acknowledged: acknowledged })
				} else {
					throw new Error('Update error')
				}
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
