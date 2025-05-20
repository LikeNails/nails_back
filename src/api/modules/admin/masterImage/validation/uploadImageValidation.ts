import Joi from 'joi'

export const uploadImageSchema = Joi.object({
	name: Joi.string().required().messages({
		'string.base': 'Поле "name" должно быть строкой\n',
		'any.required': 'Поле "name" обязательно\n',
	}),
	masterId: Joi.string().required().messages({
		'string.base': 'Значение должно быть строкой',
		'any.required': 'Поле "masterId" обязательно',
	}),
})
