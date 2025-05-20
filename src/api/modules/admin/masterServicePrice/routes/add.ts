import express from 'express'

import { addSchema } from '../validation/addValidation'
import { ServiceModel } from '../../../../../models/Service'
import { UserModel } from '../../../../../models/User'
import {
	MasterServicePriceModel,
	MasterServicePriceType,
} from '../../../../../models/MasterServicePrice'
const router = express.Router()

type addRequestDTO = {
	price: number
	serviceId: string
	masterId: string
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
			const { price, serviceId, masterId } = req.body

			const service = await ServiceModel.findById(serviceId)
			const master = await UserModel.findById(masterId)

			if (service && master) {
				const masterServicePriceIdentic =
					await MasterServicePriceModel.findOne({
						price: price,
						master: masterId,
						service: serviceId,
					})
				if (masterServicePriceIdentic) {
					throw new Error('Created early')
				} else {
					let masterServicePrice: MasterServicePriceType =
						new MasterServicePriceModel({
							price: price,
							master: masterId,
							service: serviceId,
						})
					const priceOut = await masterServicePrice.save()
					if (priceOut) {
						res.status(201).json(masterServicePrice)
					}
				}
			} else {
				res.status(500)
				throw new Error('Cant find service and master')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
