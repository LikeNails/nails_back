import Joi from 'joi'

export const deleteSchema = Joi.object({
	timeslotId: Joi.string().required().messages({
		'string.base': 'Поле должно быть числом\n',
		'any.required': 'Поле обязательно\n',
	}),
})
