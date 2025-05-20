import Joi from 'joi'

export const addMonthSchema = Joi.object({
	//todo all
	calender_days: Joi.array().items(
		Joi.object({
			email: Joi.number().integer().required().messages({
				'number.base': '"day" должно быть числом',
				'number.integer': '"day" должно быть целым числом',
				'any.required': '"day" обязательно к заполнению',
			}),
			weekend: Joi.boolean().required().messages({
				'boolean.base':
					'"weekend" должно быть булевым значением (true или false)',
				'any.required': '"weekend" обязательно к заполнению',
			}),
		})
			.required()
			.messages({
				'array.base': '"calender_days" должно быть массивом',
				'array.includesRequiredUnknowns':
					'Некоторые элементы массива "calender_days" содержат ошибки',
				'any.required': '"calender_days" обязательное поле',
			}),
	),
	year: Joi.number().required().messages({
		'number.base': 'Поле "year" должно быть числом\n',
		'any.required': 'Поле "family_name" обязательно\n',
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
		.required()
		.messages({
			'any.only':
				'Значение должно быть одним из месяцев (например: January)',
			'string.base': 'Месяц должен быть строкой',
			'any.required': 'Поле "month" обязательно',
		}),
	user_id: Joi.string().required().messages({
		'string.base': 'Значение должно быть строкой',
		'any.required': 'Поле "user" обязательно',
	}),
})
