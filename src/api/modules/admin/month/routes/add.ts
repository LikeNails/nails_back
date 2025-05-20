import express from 'express'
import MonthModel, {
	MonthType,
	CalenderDay,
	MonthNames,
} from '../../../../../models/Month'
import { addMonthSchema } from '../validation/addMonthValidation'
import { monthDaysCountCheck } from '../../../../utils/utils'
import { UserModel } from '../../../../../models/User'
const router = express.Router()

type addMonthRequestDTO = {
	calender_days: CalenderDay[]
	year: number
	name: MonthNames
	masterId: string
	number: number
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, addMonthRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = addMonthSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			} else {
				const { calender_days, year, name, masterId, number } = req.body
				const month_identic_for_user = await MonthModel.findOne({
					masterId: masterId,
					year: year,
					name: name,
				})

				if (month_identic_for_user) {
					throw new Error('Запись уже существует')
				} else {
					if (
						!monthDaysCountCheck({
							month_name: name,
							calender_days: calender_days,
							year: year,
						})
					) {
						throw new Error(
							'Количество дней не совпадает с количеством дней в месяце',
						)
					} else {
						const month = new MonthModel({
							calender_days,
							year,
							name,
							master: masterId,
							number,
						})
						if (await month.save()) {
							res.status(201).json(month)
						} else {
							throw new Error('Ошибка при сохранении сущности')
						}
					}
				}
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
