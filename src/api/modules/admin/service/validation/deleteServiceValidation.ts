import Joi from 'joi'

export const deleteServiceSchema = Joi.object({
	serviceId: Joi.string().required().messages({
		'string.base': 'Поле "serviceId" должно быть числом\n',
		'any.required': 'Поле "serviceId" обязательно\n',
	}),
})
