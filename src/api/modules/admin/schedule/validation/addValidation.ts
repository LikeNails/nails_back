import Joi from 'joi'

const timeslotSchema = Joi.number().messages({
	'number.base': 'Элементы массива должны быть числами',
})

export const addSchema = Joi.object({
	masterId: Joi.string().required().messages({
		'string.base': 'Поле должно быть строкой',
		'any.required': 'Поле обязательно',
	}),
	timeslots: Joi.array().items(timeslotSchema).min(1).required().messages({
		'array.base': '"timeslots" должно быть массивом',
		'array.includesRequiredUnknowns':
			'Один из элементов "timeslots" некорректен',
		'array.min': '"timeslots" должен содержать хотя бы один элемент',
		'any.required': '"timeslots" обязательно',
	}),
})
