import express from 'express'
import { deleteSchema } from '../validation/deleteValidation'
import MasterServicePriceModel from '../../../../../models/MasterServicePrice'
const router = express.Router()

type deleteRequestDTO = {
	masterServicePriceId: string
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
				return next(new Error(`Validation error ${error}`))
			}
			const { masterServicePriceId } = req.body
			const masterServicePrice =
				await MasterServicePriceModel.findById(masterServicePriceId)

			if (!masterServicePrice) {
				res.status(500)
				throw new Error('Cant find month by id')
			} else {
				const { acknowledged, deletedCount } =
					await masterServicePrice.deleteOne()
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
