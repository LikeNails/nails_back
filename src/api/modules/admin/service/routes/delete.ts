import express from 'express'

import { deleteServiceSchema } from '../validation/deleteServiceValidation'
import { ServiceModel } from '../../../../../models/Service'
import MasterServicePriceModel from '../../../../../models/MasterServicePrice'
const router = express.Router()

type deleteServiceRequestDTO = {
	serviceId: string
}

type deleteMonthResponseDTO = {
	acknowledged: boolean
	deletedCount: number
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, deleteServiceRequestDTO>,
		res: express.Response<deleteMonthResponseDTO>,
		next: express.NextFunction,
	) => {
		try {
			const { error } = deleteServiceSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { serviceId } = req.body

			const service = await ServiceModel.findById(serviceId)

			const servicePrices = await MasterServicePriceModel.find({
				service: serviceId,
			})

			if (servicePrices.length > 0) {
				let deletePromises = []
				for (let servicePrice of servicePrices) {
					deletePromises.push(servicePrice.deleteOne())
				}

				Promise.allSettled(deletePromises)
			}

			if (service) {
				const { acknowledged, deletedCount } = service.deleteOne()
				res.status(201).json({
					acknowledged: acknowledged,
					deletedCount: deletedCount,
				})
			} else {
				throw new Error('Cant find service to delete')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
