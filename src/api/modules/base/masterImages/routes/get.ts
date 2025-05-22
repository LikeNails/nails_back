import express from 'express'

import { Model } from 'mongoose'
import { MasterImageModel } from '../../../../../models/MasterImage'
const router = express.Router()

router.post(
	'',
	async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const modelsArray = await MasterImageModel.find()

			if (modelsArray && modelsArray.length > 0) {
				res.status(200).json({
					models: modelsArray,
				})
			} else {
				res.status(500)
				throw new Error('No entities for this page')
			}
		} catch (error) {
			next(error)
		}
	},
)

export default router
