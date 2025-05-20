import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
	Ref,
} from '@typegoose/typegoose'
import { UserModel, UserType } from './User'

export type CalenderDay = {
	day: number
	weekend: boolean
}

export type MonthNames =
	| 'January'
	| 'Fabruary'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December'

class Month {
	@prop({ required: true })
	public calender_days!: CalenderDay[]

	@prop({ required: true })
	public year!: number

	@prop({ required: true })
	public name!: MonthNames

	@prop({ ref: 'User', required: true })
	public master!: Ref<UserType>

	@prop({ required: true })
	public number!: number
}

export type MonthType = DocumentType<Month>
export const MonthModel = getModelForClass(Month)
export default MonthModel

//месяц содержит рабочией дни сотрудника в каждом месяце, заполняется админом
