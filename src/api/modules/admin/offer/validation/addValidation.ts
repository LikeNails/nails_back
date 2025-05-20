import Joi from 'joi'

export const addSchema = Joi.object({
	monthId: Joi.string().required().messages({
		'string.base': 'Поле должно быть строкой',
		'any.required': 'Поле обязательно',
	}),
	scheduleId: Joi.string().required().messages({
		'string.base': 'Поле должно быть строкой',
		'any.required': 'Поле обязательно',
	}),
	timeslotId: Joi.string().required().messages({
		'string.base': 'Поле должно быть строкой',
		'any.required': 'Поле обязательно',
	}),
	userId: Joi.string().required().messages({
		'string.base': 'Поле должно быть строкой',
		'any.required': 'Поле обязательно',
	}),
})
