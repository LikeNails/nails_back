import Joi from 'joi'

export const getBindibgsValidateSchema = Joi.object({
	masterId: Joi.string().required().messages({
		'string.base': 'Поле "masterId" должно быть строкой\n',
		'any.required': 'Поле "masterId" обязательно\n',
	}),
})
