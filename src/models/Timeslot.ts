import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
} from '@typegoose/typegoose'

class Timeslot {
	@prop({ required: true, unique: true })
	public start!: string

	@prop({ required: true, unique: true })
	public end!: string

	@prop({ required: true, unique: true })
	public order!: number
}

export type TimeslotType = DocumentType<Timeslot>
export const TimeslotModel = getModelForClass(Timeslot)
export default TimeslotModel
