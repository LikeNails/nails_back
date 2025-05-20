import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
	Ref,
} from '@typegoose/typegoose'

import { UserModel } from './User'

class Image {
	@prop({ required: true })
	public name!: string

	@prop({ required: true })
	public imageUrl!: string
}

export type ImageType = DocumentType<Image>
export const ImageModel = getModelForClass(Image)
export default ImageModel
