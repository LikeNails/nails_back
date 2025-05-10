import {
	prop,
	modelOptions,
	DocumentType,
	getModelForClass,
	Ref,
	pre,
} from '@typegoose/typegoose'

import RoleModel, { RoleType } from './Role'
import bcrypt from 'bcryptjs'

@pre<User>('save', async function () {
	if (!this.isModified('password')) return

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})
class User {
	/**
	 * Имя пользователя
	 *
	 * @type {string}
	 */
	@prop()
	public first_name?: string

	/**
	 * Фамилия пользователя
	 *
	 * @type {string}
	 */
	@prop()
	public family_name?: string

	/**
	 * Пароль пользователя (в хэшированном виде)
	 *
	 * @type {string}
	 * @required
	 */
	@prop({ required: true })
	public password!: string

	/**
	 * Уникальный email пользователя
	 *
	 * @type {string}
	 * @required
	 * @unique
	 */
	@prop({ required: true, unique: true })
	public email!: string

	/**
	 * Токен подтверждения аккаунта по почте
	 *
	 * @type {string}
	 * @required
	 * @unique
	 */
	@prop({ required: true, unique: true })
	public email_confirm_token!: string

	/**
	 * Номер телефона (необязательное поле)
	 *
	 * @type {string | undefined}
	 * @optional
	 */
	@prop()
	public phone_number?: string

	/**
	 * Refresh token для восстановления сессии
	 *
	 * @type {string | undefined}
	 * @optional
	 */
	@prop()
	public refresh_token?: string | null

	@prop({ ref: () => RoleModel, default: [] })
	public roles?: Ref<RoleType>[]

	get roleIds(): string[] {
		return this.roles?.map((r) => r._id.toString()) || []
	}

	public async comparePassword(
		this: UserType,
		candidatePassword: string,
	): Promise<boolean> {
		return bcrypt.compare(candidatePassword, this.password)
	}
}

export type UserType = DocumentType<User>

/**
 * Модель пользователя
 *
 * Содержит следующие поля:
 * - `email` *(string, required, unique)*
 * - `password` *(string, required)*
 * - `emain_confirm_token` *(string, required, unique)*
 * - `phone_number` *(string, optional)*
 * - `refresh_token` *(string, optional)*
 * - `roles` *(Ref<RoleType>[], optional)*
 *
 */
export const UserModel = getModelForClass(User)
