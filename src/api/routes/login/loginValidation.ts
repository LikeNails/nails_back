import Joi from 'joi'

export const loginSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'string.email': 'Некорректный формат email\n',
		'any.required': 'Поле "email" required\n',
	}),
	password: Joi.string().required().messages({
		'string.base': 'Поле "password" должно быть строкой\n',
		'any.required': 'Поле "password" обязательно\n',
	}),
})
