import mongoose, { Schema, Document, Model, ObjectId} from 'mongoose';

type TAud = {
	_id: ObjectId,
	number: number,
	type: "lecture" | "lab" | "comp",
	size: number
}

const audSchema = new Schema<TAud>(
{
	number: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		required: true,
	}
},
{
	timestamps: true
})

const Aud: Model<TAud> = mongoose.model<TAud>('Aud', audSchema);
export default Aud;