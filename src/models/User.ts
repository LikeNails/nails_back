import mongoose, { Types, Schema, Document, Model} from 'mongoose';
import bcrypt from 'bcryptjs'
import { kStringMaxLength } from 'buffer';

type TBio = {
	first: string,
	second?: string,
	family: string,
}

type TUserMethods = {
	comparePassword(candidatePassword: string): Promise<boolean>;
}

type DayOfWeek = 
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

type Availability =  {
	[key in DayOfWeek]?: string[]
}

type Courses = {
	course_id: String,
	course_name: String,
	hours_per_week: Number,
}

interface Load extends Document {
	max_hours_per_week: Number,
	courses: Courses,
}

type TeacherInfo = {
	specialization: string[],
	availability: Availability,
	current_load: Load
}

export interface TUser extends Document, TUserMethods{
	_id: mongoose.Schema.Types.ObjectId,
	email: string,
	bio?: TBio,
	refresh_token?: string | null,
	password_hash: string,
	type: 'admin' | 'student' | 'teacher',
	group?: number,
	created_at: Date,
	teacher_info?: TeacherInfo,
}

const userSchema = new Schema<TUser>({
	email: {
		type: String,
		required: true,
		unique: true
	},
	bio: {
		first: String,
		second: String,
		family: String,
	},
	refresh_token: String,
	password_hash: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	group: Number,
	created_at: Date,
	
	teacher_info: {
		specialization: {
			type: Array(String),
		},
		availability: {
			monday: String,
			tuesday: String,
			wednesday: String,
			thursday: String,
			friday: String,
			saturday: String,
			sunday: String
		},
		current_load: {
			max_hours_per_week: Number,
			courses: {
				course_id: String,
				course_name: String,
				hours_per_week: Number,
			}
		}
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



export const User: Model<TUser> = mongoose.model<TUser>('User', userSchema);
