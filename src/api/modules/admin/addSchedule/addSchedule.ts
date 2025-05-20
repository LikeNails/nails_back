import express from 'express'
import MonthModel, {
	MonthType,
	CalenderDay,
	MonthNames,
} from '../../../../models/Month'
import { addScheduleSchema } from './addScheduleValidation'
import { ScheduleModel } from '../../../../models/Schedule'
const router = express.Router()

type addScheduleRequestDTO = {
	timeslots: number[]
	master_id: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, addScheduleRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = addScheduleSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { master_id, timeslots } = req.body
			const schedule_identic_for_user = ScheduleModel.find({
				master_id,
			})

			if (schedule_identic_for_user.length !== 0) {
				throw new Error('Запись уже существует')
			}
			const schedule = new ScheduleModel({
				master: master_id,
				timeslots: timeslots,
			})

			// if (
			// 	!monthDaysCountCheck({
			// 		month_name: name,
			// 		calender_days: calender_days,
			// 		year: year,
			// 	})
			// ) {
			// 	throw new Error(
			// 		'Количество дней не совпадает с количеством дней в месяце',
			// 	)
			// }
			// if (await month.save()) {
			// 	res.status(201).json(true)
			// } else {
			// 	throw new Error('Ошибка при сохранении сущности')
			// }
		} catch (error) {
			next(error)
		}
	},
)

export default router
