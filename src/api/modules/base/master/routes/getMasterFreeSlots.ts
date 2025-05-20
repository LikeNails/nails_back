import express from 'express'

import { validationSchema } from '../validation/getMasterFreeSlotsValidation'
import { OfferModel } from '../../../../../models/Offer'
import { ScheduleModel } from '../../../../../models/Schedule'
import { TimeslotModel } from '../../../../../models/Timeslot'
import { UserModel } from '../../../../../models/User'
import { MonthModel } from '../../../../../models/Month'

const router = express.Router()

type RequestDTO = {
	masterId: string
	monthNumber: number
	dayNumber: number
	yearNumber: number
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, RequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { masterId, yearNumber, dayNumber, monthNumber } = req.body

			if (!req.user) {
				throw new Error('Need to authorize')
			}

			const master = await UserModel.findById(masterId)
			const schedule = await ScheduleModel.findOne({ master: masterId })
			const month = await MonthModel.findOne({
				master: masterId,
				number: monthNumber,
			})
			if (schedule && month) {
				const offers = await OfferModel.find({
					schedule: schedule._id,
					month: month._id,
					day: dayNumber,
				})

				const allTimeslots = schedule.timeslots

				let engagedTimeslots = []

				for (let offer of offers) {
					const engagedTimeslot = await TimeslotModel.findById(
						offer.timeslot._id,
					)

					if (engagedTimeslot) {
						engagedTimeslots.push(engagedTimeslot.order)
					} else {
						res.status(500)
						throw new Error('Timeslot is not created')
					}
				}

				const freeTimeslots = allTimeslots.filter(
					(item) => !engagedTimeslots.includes(item),
				)

				let freeTimeslotsModels = []
				for (let timeslot of freeTimeslots) {
					const timeslotModel = await TimeslotModel.findOne({
						order: timeslot,
					})
					freeTimeslotsModels.push(timeslotModel)
				}

				if (freeTimeslots.length > 0) {
					res.status(200).json({
						timeslots: freeTimeslotsModels,
						monthId: month._id,
						scheduleId: schedule.id,
					})
				}
			} else {
				res.status(500)
				throw new Error('Cant find schedule by id')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
