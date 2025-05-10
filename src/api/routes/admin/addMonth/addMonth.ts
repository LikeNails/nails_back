import express from 'express'
import MonthModel, {
	MonthType,
	CalenderDay,
	MonthNames,
} from '../../../../models/Month'
import { addMonthSchema } from './addMonthValidation'
import { monthDaysCountCheck } from '../../../utils/utils'
const router = express.Router()

type addMonthRequestDTO = {
	calender_days: CalenderDay[]
	year: number
	name: MonthNames
	user_id: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, addMonthRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			//todo проверить на уникальность для соответствующего пользователя

			const { error } = addMonthSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { calender_days, year, name, user_id } = req.body

			const month = new MonthModel({
				calender_days,
				year,
				name,
				user: user_id,
			})

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
			}
			if (await month.save()) {
				res.status(201).json(true)
			} else {
				throw new Error('Ошибка при сохранении сущности')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
