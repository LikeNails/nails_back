import mongoose, { Schema, Model, ObjectId} from 'mongoose';

type TTimeStamps = {
	_id: ObjectId,
	serial: Number,
	start_time: String,
	end_time: String
}

const timeStampsSchema = new Schema<TTimeStamps>(
{
	serial: {
		type: Number,
		required: true,
	},
	start_time: {
		type: String,
		required: true,
	},
	end_time: {
		type: String,
		required: true,
	},
},
{
	timestamps: true
})

const TimeStamps: Model<TTimeStamps> = mongoose.model<TTimeStamps>('TimeStamp', timeStampsSchema);
export default TimeStamps;