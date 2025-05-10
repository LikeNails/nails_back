import mongoose from 'mongoose'
require('dotenv').config()
export const getConnection = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI!)

		console.log(`MongoDB Connected: ${conn.connection.host}`)
		return conn
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error}`)
		process.exit(1)
	}
}
