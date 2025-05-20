import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
	Ref,
} from '@typegoose/typegoose'

import { UserModel, UserType } from './User'
import ServiceModel from './Service'
import { ServiceType } from './Service'

class MasterServicePrice {
	@prop({ required: true })
	public price!: number

	@prop({ ref: 'ServiceModel', required: true })
	public service!: Ref<ServiceType>[]

	@prop({ ref: 'UserModel', required: true })
	public master!: Ref<UserType>[]
}

export type MasterServicePriceType = DocumentType<MasterServicePrice>
export const MasterServicePriceModel = getModelForClass(MasterServicePrice)
export default MasterServicePriceModel

//сумма [v]
//услуга [v]
