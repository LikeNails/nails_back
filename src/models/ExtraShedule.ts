import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose'

type TExtraShedule = {
	date: Date
	time_slot_number: Number
	name: 'Физкультура' | String
	aud_number: Number | null
}

export const extraSheduleSchema = new Schema<TExtraShedule>({
	date: {
		type: Date,
		required: true,
	},
	time_slot_number: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	aud_number: Number,
})

const ExtraShcedule: Model<TExtraShedule> = mongoose.model<TExtraShedule>(
	'ExtraShedule',
	extraSheduleSchema,
)
export default ExtraShcedule
