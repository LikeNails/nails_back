import Joi from 'joi'

export const deleteSchema = Joi.object({
	offerId: Joi.string().required().messages({
		'string.base': 'Поле  должно быть строкой\n',
		'any.required': 'Поле обязательно\n',
	}),
})
