import express from 'express'
import MonthModel, {
	MonthType,
	CalenderDay,
	MonthNames,
} from '../../../../../models/Month'
import { addSchema } from '../validation/addValidation'
import { OfferModel } from '../../../../../models/Offer'
import { ScheduleModel } from '../../../../../models/Schedule'
import { TimeslotModel } from '../../../../../models/Timeslot'
import { UserModel } from '../../../../../models/User'

const router = express.Router()

type addRequestDTO = {
	scheduleId: string
	timeslotId: string
	monthId: string
	userId: string
	day: number
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, addRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = addSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { scheduleId, timeslotId, monthId, day } = req.body

			if (!req.user) {
				throw new Error('Need to authorize')
			}

			const userId = req.user.id
			const schedule = await ScheduleModel.findById(scheduleId)
			const timeslot = await TimeslotModel.findById(timeslotId)
			const month = await MonthModel.findById(monthId)
			const user = await UserModel.findById(userId)

			if (schedule && timeslot && month && user) {
				const offerIdentic = await OfferModel.findOne({
					schedule: scheduleId,
					timeslot: timeslotId,
					day: day,
				})
				console.log(offerIdentic)
				if (offerIdentic == null) {
					const offer = new OfferModel({
						schedule: schedule,
						timeslot: timeslot,
						month: month,
						user: user,
						day: day,
					})

					if (await offer.save()) {
						res.status(201).json(offer)
					}
				} else {
					throw new Error(
						'Another offer created in this timeslot for this master',
					)
				}
			} else {
				res.status(500)
				throw new Error(
					'Cant find schedule or timeslot or month or user by id',
				)
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
