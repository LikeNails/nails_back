import { NextFunction, Request, Response } from 'express'
import ErrorResponse from './api/types/ErrorResponse'
import { AuthRequest } from './api/types/AuthRequest'
import jwt from 'jsonwebtoken'

export function notFound(req: Request, res: Response, next: NextFunction) {
	res.status(404)
	const error = new Error(`Not Found - ${req.originalUrl}`)
	next(error)
}

export function errorHandler(
	err: Error,
	req: Request,
	res: Response<ErrorResponse>,
	next: NextFunction,
) {
	const statusCode = res.statusCode != 200 ? res.statusCode : 500
	res.status(statusCode)
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
	})
}

export function authMiddleware(
	req: Request<{}, {}, AuthRequest>,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return next(new Error('No auth token'))
	}
	const token = req.headers.authorization?.split(' ')[1]
	if (!token) {
		return next(new Error('No auth token'))
	}
	try {
		const decoded = jwt.verify(
			token,
			process.env.TOKEN_SECRET!,
		) as jwt.JwtPayload
		req.body.user_id = decoded.user_id
		next()
	} catch {
		next(new Error('Invalid or expired token'))
	}
}
