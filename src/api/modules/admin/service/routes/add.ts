import express from 'express'

import { addServiceSchema } from '../validation/addServiceValidation'
import { ServiceModel } from '../../../../../models/Service'
const router = express.Router()

type addServiceRequestDTO = {
	name: string
}

router.post(
	'',
	async (
		req: express.Request<{}, {}, addServiceRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = addServiceSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { name } = req.body

			const serviceIdentic = await ServiceModel.findOne({ name })

			if (serviceIdentic) {
				throw new Error('Запись уже существует')
			}

			const service = new ServiceModel({
				name: name,
			})

			if (await service.save()) {
				res.status(201).json({ service })
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
