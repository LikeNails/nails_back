import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose'

type Distribution = {
	lections: Number
	practice: Number
	labaratory: Number
}

type TSyllabus = {
	groups: Array<String>
	name: String
	distribution: Distribution
	summ_hours: Number
	exam: boolean
	test: boolean
}

const syllabusSchema = new Schema<TSyllabus>(
	{
		groups: {
			type: Array(String),
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		distribution: {
			lections: {
				type: Number,
				required: true,
			},
			practice: {
				type: Number,
				required: true,
			},
			labaratory: {
				type: Number,
				required: true,
			},
		},
	},
	{
		timestamps: true,
	},
)

const Syllabus: Model<TSyllabus> = mongoose.model<TSyllabus>(
	'Syllabus',
	syllabusSchema,
)
export default Syllabus
