import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
	Ref,
} from '@typegoose/typegoose'
import ScheduleModel from './Schedule'
import { ScheduleType } from './Schedule'
import TimeslotModel, { TimeslotType } from './Timeslot'
import MonthModel, { MonthType } from './Month'
import { UserModel, UserType } from './User'

class Offer {
	@prop({ ref: () => ScheduleModel, required: true })
	public schedule!: Ref<ScheduleType>

	@prop({ ref: () => TimeslotModel, required: true })
	public timeslot!: Ref<TimeslotType>

	@prop({ ref: () => MonthModel, required: true })
	public month!: Ref<MonthType>

	@prop({ ref: () => UserModel, required: true })
	public user!: Ref<UserType>

	@prop({ ref: () => UserModel, required: true })
	public master!: Ref<UserType>

	@prop({ required: true })
	public day!: number

	@prop({ required: true })
	public monthNumber!: number

	@prop({ required: true })
	public yearNumber!: number

	@prop({ required: true })
	public time!: string
}

export type OfferType = DocumentType<Offer>
export const OfferModel = getModelForClass(Offer)
export default OfferModel
