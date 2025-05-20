import Joi from 'joi'

export const updateMonthSchema = Joi.object({
	monthId: Joi.string().required().messages({
		'number.base': 'Поле "monthId" должно быть строкой\n',
		'any.required': 'Поле "monthId" обязательно\n',
	}),
	calender_days: Joi.array().items(
		Joi.object({
			day: Joi.number().integer().required().messages({
				'number.base': '"day" должно быть числом',
				'number.integer': '"day" должно быть целым числом',
				'any.required': '"day" обязательно к заполнению',
			}),
			weekend: Joi.boolean().required().messages({
				'boolean.base':
					'"weekend" должно быть булевым значением (true или false)',
				'any.required': '"weekend" обязательно к заполнению',
			}),
		}).messages({
			'array.base': '"calender_days" должно быть массивом',
			'array.includesRequiredUnknowns':
				'Некоторые элементы массива "calender_days" содержат ошибки',
		}),
	),
	year: Joi.number().messages({
		'number.base': 'Поле "year" должно быть числом\n',
	}),
	name: Joi.string()
		.valid(
			'January',
			'Fabruary',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		)
		.messages({
			'any.only':
				'Значение должно быть одним из месяцев (например: January)',
			'string.base': 'Месяц должен быть строкой',
		}),
})
