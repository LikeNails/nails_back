import express from 'express'

import { updateServiceSchema } from '../validation/updateServiceValidation'
import { ServiceModel } from '../../../../../models/Service'
const router = express.Router()

type updateServiceRequestDTO = {
	serviceId: string
	name: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, updateServiceRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = updateServiceSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { serviceId, name } = req.body

			const service = await ServiceModel.findById(serviceId)
			const serviceNameIdentic = await ServiceModel.findOne({ name })

			if (service) {
				if (serviceNameIdentic) {
					throw new Error('Service with the same name existing')
				}
				const { acknowledged } = await service.updateOne({ name: name })
				if (acknowledged == true) {
					res.status(201).json({ status: acknowledged })
				} else {
					throw new Error('Update error')
				}
			} else {
				throw new Error('Cant find service to update')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
