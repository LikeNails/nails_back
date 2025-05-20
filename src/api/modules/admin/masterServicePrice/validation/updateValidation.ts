import Joi from 'joi'

export const updateSchema = Joi.object({
	price: Joi.number().required().messages({
		'number.base': 'Поле "price" должно быть числом\n',
		'any.required': 'Поле "price" обязательно\n',
	}),
	masterServicePriceId: Joi.string().required().messages({
		'number.base': 'Поле должно быть строкой\n',
		'any.required': 'Поле обязательно\n',
	}),
})
