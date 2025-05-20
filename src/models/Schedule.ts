import mongoose, { Types, Schema, Document, Model } from 'mongoose'

import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
	Ref,
} from '@typegoose/typegoose'

import { UserModel, UserType } from './User'

class Schedule {
	@prop({ required: true })
	public timeslots!: number[]

	@prop({ ref: 'User', required: true })
	public master!: Ref<UserType>
}

export type ScheduleType = DocumentType<Schedule>
export const ScheduleModel = getModelForClass(Schedule)
export default ScheduleModel

//расписание, содержит массив доступных временных слотов и айди мастера, которому пренадлежит это расписание
