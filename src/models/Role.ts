import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
} from '@typegoose/typegoose'

class Role {
	@prop({ required: true, unique: true })
	public value!: string
}

export type RoleType = DocumentType<Role>
export const RoleModel = getModelForClass(Role)
export default RoleModel
