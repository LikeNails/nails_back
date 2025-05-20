import { NextFunction, Request, Response } from 'express'
import ErrorResponse from './api/types/ErrorResponse'
import { AuthRequest } from './api/types/AuthRequest'
import { UserModel } from './models/User'
import jwt from 'jsonwebtoken'
import RoleModel, { RoleType } from './models/Role'
import { StringRegexOptions } from 'joi'
import { Ref } from '@typegoose/typegoose'

declare global {
	namespace Express {
		interface UserPayload {
			id: string
			roles?: string[]
		}
		interface Request {
			user?: UserPayload
		}
	}
}

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

export async function authMiddleware(
	req: Request<{}, {}, AuthRequest>,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return next(new Error('No auth token'))
	}
	const token = authHeader?.split(' ')[1]
	if (!token) {
		return next(new Error('No auth token'))
	}
	try {
		const decoded = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET!,
		) as jwt.JwtPayload
		const user = await UserModel.findById(decoded.user_id)

		if (!user) {
			return res.status(401).json({ message: 'User not found' })
		}

		req.user = {
			id: user._id.toString(),
			roles: user?.roleIds,
		}

		next()
	} catch (error) {
		next(new Error(`Invalid or expired token ${error}`))
	}
}

export const roleMiddleware = (allowedRoles: string[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return next(new Error('Need to authorize'))
		}

		const userRoles = req.user.roles || []

		const results = await Promise.allSettled(
			allowedRoles.map((roleName) =>
				RoleModel.findOne({ value: roleName }).exec(),
			),
		)

		const allowedRolesIds = results
			.filter(
				(
					result,
				): result is { status: 'fulfilled'; value: RoleType } => {
					return result.status === 'fulfilled'
				},
			)
			.map((result) => result!.value)

		console.log(userRoles)
		const hasAccess = allowedRolesIds.some((role) =>
			userRoles.includes(role.id),
		)

		if (!hasAccess) {
			return next(new Error('Forbidden'))
		}
		next()
	}
}
