import express from 'express'

import { updateSchema } from '../validation/updateValidation'
import { ServiceModel } from '../../../../../models/Service'
import MasterServicePriceModel from '../../../../../models/MasterServicePrice'
const router = express.Router()

type updateRequestDTO = {
	price: string
	masterServicePriceId: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, updateRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = updateSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Validation error\n ${error}`))
			}
			const { price, masterServicePriceId } = req.body

			const masterServicePrice =
				await MasterServicePriceModel.findById(masterServicePriceId)

			if (!masterServicePrice) {
				throw new Error('Cant find model')
			} else {
				const { acknowledged } = await masterServicePrice.updateOne({
					price: price,
				})
				if (acknowledged == true) {
					res.status(201).json({ status: true })
				}
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
