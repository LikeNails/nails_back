import nodemailer from 'nodemailer'
import 'dotenv/config'

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.MAIL,
		pass: process.env.MAIL_PASSWORD,
	},
})

export const sendConfirmationMail = async (
	confirmationURL: string,
	email: string,
): Promise<boolean> => {
	try {
		console.log(confirmationURL)
		console.log(email)
		const info = await transporter.sendMail({
			from: `"${process.env.MAIL_NAME}" <${process.env.NAME}>`,
			to: `${email}`,
			subject: `Подтверждение регистрации на сайте салона красоты`,
			text: `Для подтверждения регистрации в салоне красоты перейдите по указанной ссылке ${confirmationURL}`,
		})
		console.log('Письмо отправлено ', info.messageId)
		return true
	} catch (error) {
		console.error('Ошибка при отправке письма', error)
		return false
	}
}
