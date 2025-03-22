import { Request } from 'express'

type LoginRequest = {
	email: string,
	password: string
}

export default LoginRequest
