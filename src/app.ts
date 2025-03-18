import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'
// import webpack from 'webpack';
// import webpack_middleware from 'webpack-dev-middleware';
import * as middlewares from './middlewares'
import api from './api/index'

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api/v1', api)

mongoose.connect(process.env.MONGO_URI as string, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
