import Joi from 'joi'

export const deleteMonthSchema = Joi.object({
	monthId: Joi.string().required().messages({
		'string.base': 'Поле "monthId" должно быть строкой\n',
		'any.required': 'Поле "monthId" обязательно\n',
	}),
})
