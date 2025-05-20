import express from 'express'
import { deleteSchema } from '../validation/deleteValidation'
import OfferModel from '../../../../../models/Offer'
const router = express.Router()

type deleteRequestDTO = {
	offerId: string
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
				return next(new Error(`Validation error \n ${error}`))
			}
			const { offerId } = req.body
			const offer = await OfferModel.findById(offerId)

			if (!offer) {
				res.status(500)
				throw new Error('Cant find offer by id')
			} else {
				const { acknowledged, deletedCount } = await offer.deleteOne()
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
