import Joi from 'joi'

export const validationSchema = Joi.object({
	masterId: Joi.string().required().messages({
		'string.base': 'Поле должно быть строкой',
		'any.required': 'Поле обязательно',
	}),
})
