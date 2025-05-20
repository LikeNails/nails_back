import Joi from 'joi'

export const updateServiceSchema = Joi.object({
	serviceId: Joi.string().required().messages({
		'string.base': 'Поле "serviceId" должно быть числом\n',
		'any.required': 'Поле "serviceId" обязательно\n',
	}),
	name: Joi.string().required().messages({
		'string.base': 'Поле "name" должно быть числом\n',
		'any.required': 'Поле "name" обязательно\n',
	}),
})
