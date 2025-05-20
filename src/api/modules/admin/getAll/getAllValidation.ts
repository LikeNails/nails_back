import Joi from 'joi'

export const getAllSchema = Joi.object({
	model: Joi.string()
		.valid(
			'Offer',
			'User',
			'Schedule',
			'Timeslot',
			'Service',
			'MasterImage',
			'Month',
			'MasterServicePrice',
			'Image',
		)
		.required()
		.messages({
			'any.only': 'Значение вне положенного диапазона',
			'string.base': 'Значение должно быть строкой',
			'any.required': 'Поле обязательно',
		}),
	pagination: Joi.number().min(2).max(100).required().messages({
		'number.base': 'Значение должно быть числом',
		'any.required': 'Поле обязательно',
	}),
	pageNumber: Joi.number().min(0).required().messages({
		'number.base': 'Значение должно быть числом',
		'any.required': 'Поле обязательно',
	}),
})
