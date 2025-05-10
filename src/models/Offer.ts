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

class Offer {
	@prop({ ref: () => ScheduleModel, required: true })
	public schedule!: Ref<ScheduleType>

	@prop({ ref: () => TimeslotModel, required: true })
	public timeslot!: Ref<TimeslotType>

	@prop({ ref: () => MonthModel, required: true })
	public month!: Ref<MonthType>
}

export type OfferType = DocumentType<Offer>
export const OfferModel = getModelForClass(Offer)
export default OfferModel
