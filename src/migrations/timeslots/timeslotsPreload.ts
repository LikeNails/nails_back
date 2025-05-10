import { TimeslotType, TimeslotModel } from '../../models/Timeslot'
import { timeslots } from './timeslots'

require('dotenv').config()

const userValue = 'USER'
const adminValue = 'ADMIN'
const masterValue = 'MASTER'

import mongoose from 'mongoose'

const timeslotsPreload = async (): Promise<void> => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI!)

		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error}`)
		process.exit(1)
	}

	try {
		for (const timeslot of timeslots) {
			const timeslotToSave = new TimeslotModel({
				order: timeslot.order,
				value: timeslot.value,
			})

			const IsTimeslotCreated = await TimeslotModel.findOne({
				order: timeslotToSave.order,
				value: timeslotToSave.value,
			})

			if (!IsTimeslotCreated) {
				await timeslotToSave.save()
			}
		}
		console.log('Saved correctly')
	} catch (error) {
		console.log(`Ошибка при сохраненииа \n ${error}`)
	}

	mongoose.connection.close()
}
timeslotsPreload()
