import Joi from 'joi'

const timeslotSchema = Joi.object({
	value: Joi.string().required().messages({
		'string.base': '"value" должно быть строкой',
		'any.required': '"value" обязательно',
	}),
	order: Joi.number().integer().min(0).required().messages({
		'number.base': '"order" должно быть числом',
		'number.integer': '"order" должно быть целым числом',
		'number.min': '"order" должно быть не меньше 0',
		'any.required': '"order" обязательно',
	}),
})

export const updateSchema = Joi.object({
	timeslots: Joi.array().items(timeslotSchema).min(1).required().messages({
		'array.base': '"timeslots" должно быть массивом',
		'array.includesRequiredUnknowns':
			'Один из элементов "timeslots" некорректен',
		'array.min': '"timeslots" должен содержать хотя бы один элемент',
		'any.required': '"timeslots" обязательно',
	}),
})
