import express, { NextFunction } from 'express'
import { UserModel, UserType } from '../../../../../models/User'
import mongoose from 'mongoose'
import upload from '../../../../../../multerConfig'
import ImageModel from '../../../../../models/Image'
import MasterImageModel from '../../../../../models/MasterImage'
import { uploadImageSchema } from '../validation/uploadImageValidation'

type UploadImageResponse = {
	status: boolean
}

// type UploadImageRequest = {
// 	name: string
// 	masterId: string
// }

const router = express.Router()

router.post(
	'',
	upload.single('image'),
	async (
		req: express.Request,
		res: express.Response<UploadImageResponse>,
		next: NextFunction,
	) => {
		// const session = await mongoose.startSession()
		// session.startTransaction()
		try {
			console.log(req.body)
			// const { error } = uploadImageSchema.validate(req.body, {
			// 	abortEarly: false,
			// })
			// if (error) {
			// 	return next(new Error(`Ошибка валидации \n ${error}`))
			// }
			if (!req.file) {
				res.status(400)
				throw new Error('No file uploaded')
			}

			const { masterId, name } = req.body

			const master = await UserModel.findById(masterId)

			if (!master) {
				res.status(404)
				throw new Error('Master not found')
			}

			const exMasterImage = await MasterImageModel.findOne({
				master: masterId,
			})

			if (exMasterImage) {
				throw new Error('Delete previous master image before upload')
			} else {
				const image = new ImageModel({
					name: name,
					imageUrl: `/uploads/${req.file.filename}`,
				})

				await image.save()

				const masterImage = new MasterImageModel({
					master: master,
					image: image,
					imageUrl: `/uploads/${req.file.filename}`,
				})

				masterImage.save()
				// await session.commitTransaction()
				res.status(201).json({ status: true })
			}
		} catch (error) {
			if (req.file) {
				const fs = require('fs')
				const path = require('path')
				const filePath = path.resolve(req.file.path)

				fs.unlink(filePath, (err: any) => {
					if (err) {
						console.error('Failed to delete file:', err)
					} else {
						console.log('File deleted successfully')
					}
				})
			}
			res.status(500)
			return next(new Error(`Server error \n ${error}`))
		}
	},
)

export default router
