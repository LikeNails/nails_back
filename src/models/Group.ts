import mongoose, {Schema, Model} from 'mongoose'

export type TGroup = {
	name: string,
	size: number,
}

const groupSchema = new Schema<TGroup>({
	name: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		required: true
	},
},
{
	timestamps: true
})

const Group: Model<TGroup> = mongoose.model<TGroup>('Group', groupSchema);
export default Group;