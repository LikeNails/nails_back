import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
	Ref,
} from '@typegoose/typegoose'

import { UserModel } from './User'
import ServiceModel from './Services'
import { ServiceType } from './Services'

class MasterServicePrice {
	@prop({ required: true })
	public price!: number

	@prop({ ref: () => ServiceModel, required: true })
	public services!: Ref<ServiceType>[]
}

export type MasterServicePriceType = DocumentType<MasterServicePrice>
export const MasterServicePriceModel = getModelForClass(MasterServicePrice)
export default MasterServicePriceModel

//сумма [v]
//услуга [v]
