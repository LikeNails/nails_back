import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
} from '@typegoose/typegoose'

class Service {
	@prop({ required: true, unique: true })
	public name!: string
}

export type ServiceType = DocumentType<Service>
export const ServiceModel = getModelForClass(Service)
export default ServiceModel
