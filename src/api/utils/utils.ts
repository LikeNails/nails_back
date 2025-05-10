import RoleModel, { RoleType } from '../../models/Role'
import { CalenderDay } from '../../models/Month'
export const getRole = async (roleName: string): Promise<RoleType | null> => {
	const role = await RoleModel.findOne({ value: roleName })
	return role
}

export const monthDaysCountCheck = ({
	month_name,
	calender_days,
	year,
}: {
	month_name: string
	calender_days: CalenderDay[]
	year: number
}): boolean => {
	const days_count = calender_days.length
	let expected_days = 0

	switch (month_name) {
		case 'January':
			expected_days = 31
			break
		case 'Fabruary':
			expected_days =
				(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
					? 29
					: 28
			break
		case 'March':
			expected_days = 31
			break
		case 'April':
			expected_days = 30
			break
		case 'May':
			expected_days = 31
			break
		case 'June':
			expected_days = 30
			break
		case 'July':
			expected_days = 31
			break
		case 'August':
			expected_days = 31
			break
		case 'September':
			expected_days = 30
			break
		case 'October':
			expected_days = 31
			break
		case 'November':
			expected_days = 30
			break
		case 'December':
			expected_days = 31
			break
		default:
			throw new Error(`Неизвестный месяц: ${month_name}`)
	}

	return days_count === expected_days
}
