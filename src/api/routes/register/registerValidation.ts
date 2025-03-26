import Joi from 'joi'


const bioSchema = Joi.object({
	first: Joi.string().required().messages({
		'string.base': 'Поле "first" должно быть строкой\n',
		'any.required': 'Поле "first" обязательно\n'
	}),
	second: Joi.string().optional(),
	family: Joi.string().required().messages({
		'string.base': 'Поле "family" должно быть строкой\n',
		'any.required': 'Поле "family" обязательно\n'
	})
});

const availabilityShema = Joi.object({
	monday: Joi.string().optional,
	tuesday: Joi.string().optional,
	wednesday: Joi.string().optional,
	thursday: Joi.string().optional,
	friday: Joi.string().optional,
	saturday: Joi.string().optional,
	sunday: Joi.string().optional,
})

const coursesSchema = Joi.array().items(
	Joi.object({
		course_id: Joi.string().required(),
		course_name: Joi.string().required(),
		hours_per_week: Joi.number().integer().min(0).required()
	})
)

const loadSchema = Joi.object({
	max_hours_per_week: Joi.number().integer().min(0).required(),
	courses: coursesSchema.required()
})

const teacherInfoSchema = Joi.object({
	specialization: Joi.array().items(Joi.string()).required(),
	availability: availabilityShema.optional(),
	current_load: loadSchema.required()
})

export const registerSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'string.email': 'Некорректный формат email\n',
		'any.required': 'Поле "email" required\n'
	}),
	bio: bioSchema.optional(),
	refresh_token: Joi.string().allow(null).optional(),
	password: Joi.string().required().messages({
		'string.base': 'Поле "password_hash" должно быть строкой\n',
        'any.required': 'Поле "password_hash" обязательно\n'
	}),
	type: Joi.string().valid('teacher', 'student').required().messages({
		'any.only': 'Поле "type" должно быть teacher\n',
        'any.required': 'Поле "type" обязательно\n'
	}),
	teacher_info: teacherInfoSchema.when('type', {
		is: 'teacher',
		then: Joi.required().messages({
			'any.required': 'Поле teacher_info обязательно для типа teacher\n'
		}),
		otherwise: Joi.forbidden().messages({
			'any.unknown': 'Поле teacher_info запрещено для этого типа\n'
		})
	}),
	group: Joi.string().when('type', {
		is: 'student',
		then: Joi.required().messages({
			'any.required': 'Поле group обязательно для типа student\n'
		}),
		otherwise: Joi.forbidden().messages({
			'any.unknown': 'Поле group запрещено для типа типов, не являющихся студентами\n'
		})
	})
})
