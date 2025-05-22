import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
// import webpack from 'webpack';
// import webpack_middleware from 'webpack-dev-middleware';
import * as middlewares from './middlewares'
import api from './api/index'
import upload from '../multerConfig'

require('dotenv').config()

const app = express()

const logDirectory = path.join(__dirname, 'logs')
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory)
}
const accessLogStream = fs.createWriteStream(
	path.join(logDirectory, 'access.log'),
	{ flags: 'a' },
)

// Настройка morgan для записи в файл
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'))

app.use(express.json())
app.use(helmet())
const corsOptions = {
	origin: function (origin: any, callback: any) {
		const allowedOrigins = [
			'http://localhost:3000',
			'http://localhost:4200',
			'http://localhost:4300',
		]

		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
}

app.use(cors(corsOptions))

app.use('/api/v1', api)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.post('/upload', upload.single('image'), (req, res) => {
	if (!req.file) {
		return res
			.status(400)
			.send({ success: false, error: 'Файл не загружен' })
	}
	res.send({
		success: true,
		fileUrl: `/uploads/${req.file.filename}`,
	})
})
app.use(middlewares.errorHandler)
app.use(middlewares.notFound)

export default app
