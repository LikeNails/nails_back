import { NextFunction, Request, Response } from 'express'
import ErrorResponse from './api/types/ErrorResponse'
import LoginRequest from './api/types/Login/LoginRequestBody'
import { Jwt, JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export function notFound(req: Request, res: Response, next: NextFunction) {
	res.status(404)
	const error = new Error(`Not Found - ${req.originalUrl}`)
	next(error)
}

export function errorHandler(
	err: Error,
	req: Request,
	res: Response<ErrorResponse>
) {
	const statusCode = res.statusCode != 200 ? res.statusCode : 500
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
	})
}

export function authMiddleware(
	req: Request & LoginRequest,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.split(' ')[1]
	if(!token){
		throw new Error('No auth token')
	}
	try{
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload
		req.body.user_id = decoded.user_id
	}
	catch{
		throw new Error('Invalid or expired token')
	}
}