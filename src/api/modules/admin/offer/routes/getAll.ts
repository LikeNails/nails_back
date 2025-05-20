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
type getRequestDTO = {
	pagination: number
	pageNumber: number
}
router.post(
	'',
	async (
		req: express.Request<{}, {}, getRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { pagination, pageNumber } = req.body
			if (pagination > 100) {
				res.status(400)
				throw new Error('Max pagination value = 100')
			} else {
				const offers = await OfferModel.find()

				if (offers) {
					const offersPaginated = offers.slice(
						pageNumber * pagination,
						pageNumber * pagination + pagination,
					)
					const pagesCount = Math.ceil(offers.length / pagination)
					if (offersPaginated.length > 0) {
						res.status(200).json({
							offers: offersPaginated,
							pagesCount: pagesCount,
						})
					} else {
						res.status(500)
						throw new Error('No offers for this page')
					}
				} else {
					res.status(500)
					throw new Error('No offers')
				}
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
