import express from 'express'
import MonthModel, {
	MonthType,
	CalenderDay,
	MonthNames,
} from '../../../../../models/Month'
import { addSchema } from '../validation/addValidation'
import { ScheduleModel } from '../../../../../models/Schedule'
import TimeslotModel from '../../../../../models/Timeslot'
const router = express.Router()

type addScheduleRequestDTO = {
	timeslots: number[]
	masterId: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, addScheduleRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = addSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Validation error \n ${error}`))
			}
			const { masterId, timeslots } = req.body
			const scheduleIdentic = await ScheduleModel.findOne({
				masterId,
			})

			if (scheduleIdentic) {
				throw new Error('Already exists')
			}

			for (let timeslot of timeslots) {
				console.log(timeslot)
				const timeslotModel = await TimeslotModel.findOne({
					order: timeslot,
				})

				if (!timeslotModel) {
					throw new Error('Time slot is not created')
				}
			}
			const schedule = new ScheduleModel({
				master: masterId,
				timeslots: timeslots,
			})

			if (await schedule.save()) {
				res.status(201).json(schedule)
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
