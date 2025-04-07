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

app.use(express.json())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use('/api/v1', api)

app.use(middlewares.errorHandler)
app.use(middlewares.notFound)

export default app
