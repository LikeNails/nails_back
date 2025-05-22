import Joi from 'joi'

export const deleteServiceSchema = Joi.object({
	modelId: Joi.string().required().messages({
		'string.base': 'Поле "modelId" должно быть строкой\n',
		'any.required': 'Поле "modelId" обязательно\n',
	}),
})
