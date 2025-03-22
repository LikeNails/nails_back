import mongoose, { Schema, Document, Model, ObjectId} from 'mongoose';
import bcrypt from 'bcryptjs'

type TBio = {
	first: string,
	second?: string,
	family: string,
}

interface TUserMethods {
	comparePassword(candidatePassword: string): Promise<boolean>;
}

interface TUser extends Document, TUserMethods{
	_id: ObjectId;
	email: string;
	bio: TBio,
	password_hash: string,
	type: 'admin' | 'student' | 'teacher',
	group?: number,
	created_at: Date,
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
	created_at: {
		type: Date,
	}
},
{
	timestamps: true
})

//Хэширование пароля
userSchema.pre('save', async function (next) {
	if (!this.isModified('password_hash')) return next();
	this.password_hash = await bcrypt.hash(this.password_hash, 10);
	next();
});

//Метод сравнения паролей
userSchema.methods.comparePassword = async function (candidatePassword:string) {
	return await bcrypt.compare(candidatePassword, this.password);
};  



const User: Model<TUser> = mongoose.model<TUser>('User', userSchema);
export default User;