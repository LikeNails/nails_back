import express from 'express'
import MonthModel from '../../../../models/Month'

import { OfferModel } from '../../../../models/Offer'
import { ScheduleModel } from '../../../../models/Schedule'
import { TimeslotModel } from '../../../../models/Timeslot'
import { UserModel } from '../../../../models/User'
import { ServiceModel } from '../../../../models/Service'
import { MasterImageModel } from '../../../../models/MasterImage'
import { ImageModel } from '../../../../models/Image'
import { MasterServicePriceModel } from '../../../../models/MasterServicePrice'

import { getAllSchema } from './getAllValidation'
import { Model } from 'mongoose'
const router = express.Router()
type getAllRequestDTO = {
	model: string
	pagination: number
	pageNumber: number
}
router.post(
	'',
	async (
		req: express.Request<{}, {}, getAllRequestDTO>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { error } = getAllSchema.validate(req.body, {
				abortEarly: false,
			})
			if (error) {
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			const { pagination, pageNumber, model } = req.body

			let modelBasic: Model<any> | undefined = undefined

			switch (model) {
				case 'Offer':
					modelBasic = OfferModel
					break
				case 'Month':
					modelBasic = MonthModel
					break
				case 'User':
					modelBasic = UserModel
					break
				case 'Service':
					modelBasic = ServiceModel
					break
				case 'Schedule':
					modelBasic = ScheduleModel
					break
				case 'MasterImage':
					modelBasic = MasterImageModel
					break
				case 'Timeslot':
					modelBasic = TimeslotModel
					break
				case 'MasterServicePrice':
					modelBasic = MasterServicePriceModel
					break
				case 'Image':
					modelBasic = ImageModel
					break
			}

			if (modelBasic !== undefined) {
				const modelsArray = await modelBasic.find()

				if (modelsArray && modelsArray.length > 0) {
					const modelsArrayPaginated = modelsArray.slice(
						pageNumber * pagination,
						pageNumber * pagination + pagination,
					)

					console.log(modelsArrayPaginated)
					const pagesCount = Math.ceil(
						modelsArray.length / pagination,
					)
					if (modelsArrayPaginated.length > 0) {
						res.status(200).json({
							models: modelsArrayPaginated,
							pagesCount: pagesCount,
						})
					} else {
						res.status(500)
						throw new Error('No entities for this page')
					}
				} else {
					res.status(500)
					throw new Error('No entities')
				}
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
