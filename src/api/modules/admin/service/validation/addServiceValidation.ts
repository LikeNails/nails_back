import Joi from 'joi'

export const addServiceSchema = Joi.object({
	name: Joi.string().required().messages({
		'string.base': 'Поле "name" должно быть числом\n',
		'any.required': 'Поле "name" обязательно\n',
	}),
})
