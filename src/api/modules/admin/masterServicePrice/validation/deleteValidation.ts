import Joi from 'joi'

export const deleteSchema = Joi.object({
	masterServicePriceId: Joi.string().required().messages({
		'string.base': 'Поле "monthId" должно быть строкой\n',
		'any.required': 'Поле "monthId" обязательно\n',
	}),
})
