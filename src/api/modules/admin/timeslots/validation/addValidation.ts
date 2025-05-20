import Joi from 'joi'

type Timeslot = {
	start: string
	end: string
	order: number
}

// regexp for hh:mm
const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/ // example 23:45

const timeslotSchema = Joi.object({
	start: Joi.string().pattern(timeFormatRegex, 'time').required().messages({
		'string.base': '"start" должно быть строкой',
		'string.pattern.time': '"start" должно быть в формате hh:mm',
		'any.required': '"start" обязательно',
	}),
	end: Joi.string().pattern(timeFormatRegex, 'time').required().messages({
		'string.base': '"end" должно быть строкой',
		'string.pattern.time': '"end" должно быть в формате hh:mm',
		'any.required': '"end" обязательно',
	}),
	order: Joi.number().integer().min(0).required().messages({
		'number.base': '"order" должно быть числом',
		'number.integer': '"order" должно быть целым числом',
		'number.min': '"order" должно быть не меньше 0',
		'any.required': '"order" обязательно',
	}),
})

// Функция проверки логики времени
const validateTimeslotsOrder = (timeslots: Timeslot[]): boolean => {
	const sorted = [...timeslots].sort((a, b) => a.order - b.order)

	for (let i = 0; i < sorted.length - 1; i++) {
		const currentEnd = sorted[i].end
		const nextStart = sorted[i + 1].start

		if (currentEnd > nextStart) {
			throw new Error(
				`Время "${currentEnd}" выходит за пределы "${nextStart}" следующего слота`,
			)
		}
	}

	return true
}

export const addSchema = Joi.object({
	timeslots: Joi.array()
		.items(timeslotSchema)
		.min(1)
		.required()
		.custom((value: Timeslot[], helpers) => {
			try {
				validateTimeslotsOrder(value)
				return value
			} catch (error: any) {
				return helpers.error('any.custom', { message: error.message })
			}
		})
		.messages({
			'array.base': '"timeslots" должно быть массивом',
			'array.includesRequiredUnknowns':
				'Один из элементов "timeslots" некорректен',
			'array.min': '"timeslots" должен содержать хотя бы один элемент',
			'any.required': '"timeslots" обязательно',
			'any.custom': '{#message}',
		}),
})
