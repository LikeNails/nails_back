import express, { NextFunction } from 'express'
import LoginRequestBody from '../types/Login/LoginRequestBody'
import LoginResponse from '../types/Login/LoginResponse'

import { User } from '../../models/User'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken'
const router = express.Router()

router.post(
	'', 
	async (
		req: express.Request<{},{}, LoginRequestBody>,
		res: express.Response<LoginResponse>,
		next: NextFunction
	) => {
		try{
			const {email, password} = req.body
			const user = await User.findOne({email});
			if(!user) {
				res.status(401);
				return next(new Error('Uncorrect email or password'))
			}
			
			const isMatch = await user.comparePassword(password);
			if(!isMatch) {
				res.status(401);
				return next(new Error('Uncorrect email or password'))
			}
			const accessToken = generateAccessToken(user._id)
			const refreshToken = generateRefreshToken(user._id)
			
			user.refresh_token = refreshToken;
			await user.save();
			
			res.json({accessToken, refreshToken});
		} catch(error){
			res.status(500);
			return next(new Error(`Server error \n ${error}`))
		}
	}
)

export default router
