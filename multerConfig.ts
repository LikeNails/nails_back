import multer from 'multer'
import express from 'express'

// Настройка хранилища
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/') // папка для сохранения файлов
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(
			null,
			file.fieldname +
				'-' +
				uniqueSuffix +
				'.' +
				file.originalname.split('.').pop(),
		)
	},
})

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // лимит размера файла
})

export default upload
