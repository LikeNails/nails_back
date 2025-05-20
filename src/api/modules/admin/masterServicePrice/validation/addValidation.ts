import Joi from 'joi'

export const addSchema = Joi.object({
	price: Joi.number().required().messages({
		'number.base': 'Поле "price" должно быть числом\n',
		'any.required': 'Поле "price" обязательно\n',
	}),
	masterId: Joi.string().required().messages({
		'string.base': 'Значение должно быть строкой',
		'any.required': 'Поле "masterId" обязательно',
	}),
	serviceId: Joi.string().required().messages({
		'string.base': 'Значение должно быть строкой',
		'any.required': 'Поле "serviceId" обязательно',
	}),
})
