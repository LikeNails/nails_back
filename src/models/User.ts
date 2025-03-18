import mongoose, { Schema, Document, Model, ObjectId} from 'mongoose';

type TBio = {
	first: string,
	second?: string,
	family: string,
}

type TUser = {
	_id: ObjectId;
	email: string;
	bio: TBio,
	password_hash: string,
	type: 'admin' | 'student' | 'teacher',
	group?: number
}

const userSchema = new Schema<TUser>(
{
	email: {
		type: String,
		required: true,
		unique: true
	},
	bio: {
		first: {
			type: String,
			required: true,
		},
		second: {
			type: String,
			required: false,
		},
		family: {
			type: String,
			required: true,
		}
	},
	password_hash: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	group: {
		type: Number,
		required: false,
	},
},
{
	timestamps: true
})

const User: Model<TUser> = mongoose.model<TUser>('User', userSchema);
export default User;