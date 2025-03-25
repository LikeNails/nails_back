import express, { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import {generateAccessToken, generateRefreshToken} from '../utils/generateToken'

const router = express.Router()

export type RegisterRequestBody = {
	email: string,
	password: string,
	type: 'admin' | 'student' | 'teacher',
}

export type RegisterResponse = {
	accessToken: string,
	refreshToken: string
}

router.post(
	'/register', 
	async(
		req: express.Request<{},{}, RegisterRequestBody>,
		res: express.Response<RegisterResponse>,
		next: NextFunction,
	) => {
		try{
			const {email, password, type} = req.body
			const existingUser = await User.findOne({ email })
			if (existingUser){
				res.status(400)
				return next(new Error('User is already created'))
			}
			
			const user = new User({email, password, type})
			const accessToken = generateAccessToken(user._id)
			const refreshToken = generateRefreshToken(user._id)
			
			await user.save();
			
			res.status(201).json({accessToken, refreshToken});
		} catch(error) {
			res.status(500)
			return next(new Error('Server error'))
		}
	}
)

export default router