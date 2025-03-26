import mongoose, { Schema, Document, Model, ObjectId} from 'mongoose';

type Distribution = {
	lections: Number,
	practice: Number,
	labaratory: Number
}

type TSyllabus = {
	name: String,
	format: Distribution
	
}