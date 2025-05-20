import express from 'express'

import { validationSchema } from '../validation/getMasterServicesValidation'

import MasterServicePriceModel from '../../../../../models/MasterServicePrice'
import ServiceModel from '../../../../../models/Service'
import mongoose from 'mongoose'
const router = express.Router()

type RequestDTO = {
	masterId: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, RequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = validationSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { masterId } = req.body

			const servicePrices = await MasterServicePriceModel.find({
				master: masterId,
			})

			const services = []

			if (servicePrices && servicePrices.length > 0) {
				for (let service of servicePrices) {
					let serviceService = await ServiceModel.findById(
						service.service,
					)
					console.log(serviceService)
					if (serviceService) {
						services.push(serviceService)
					}
				}
				res.status(200).json({
					servicePrices: servicePrices,
					services: services,
				})
			} else {
				res.status(500)
				throw new Error('Cant find service prices')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
