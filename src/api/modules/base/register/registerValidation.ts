import Joi from 'joi'

export const registerSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'string.email': 'Некорректный формат email\n',
		'any.required': 'Поле "email" required\n',
	}),
	refresh_token: Joi.string().allow(null).optional(),
	password: Joi.string().required().messages({
		'string.base': 'Поле "password" должно быть строкой\n',
		'any.required': 'Поле "password" обязательно\n',
	}),
	phone_number: Joi.string().required().messages({
		'string.base': 'Поле "phone_number" должно быть строкой\n',
		'any.required': 'Поле "phone_number" обязательно\n',
	}),
	first_name: Joi.string().required().messages({
		'string.base': 'Поле "first_name" должно быть строкой\n',
		'any.required': 'Поле "first_name" обязательно\n',
	}),
	family_name: Joi.string().required().messages({
		'string.base': 'Поле "family_name" должно быть строкой\n',
		'any.required': 'Поле "family_name" обязательно\n',
	}),
})
