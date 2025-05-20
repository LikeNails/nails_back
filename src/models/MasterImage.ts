import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
	Ref,
} from '@typegoose/typegoose'

import { UserModel, UserType } from './User'
import { ImageModel, ImageType } from './Image'

class MasterImage {
	@prop({ required: true, ref: 'User' })
	public master!: Ref<UserType>

	@prop({ ref: 'Image', required: true })
	public image!: Ref<ImageType>
}

export type MasterImageType = DocumentType<MasterImage>
export const MasterImageModel = getModelForClass(MasterImage)
export default MasterImageModel
