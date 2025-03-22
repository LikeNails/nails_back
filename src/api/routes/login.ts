import express, { NextFunction } from 'express'
import LoginRequestBody from '../types/Login/LoginRequestBody'
import LoginResponse from '../types/Login/LoginResponse'
import jwt from 'jsonwebtoken'
import * as middlewares from '../../middlewares'
import Requset from 'express'
import User from '../../models/User'
import generateToken from '../utils/generateToken'
const router = express.Router()


router.post(
	'/login', 
	middlewares.authMiddleware, 
	async (
		req: express.Request<{},{}, LoginRequestBody>,
		res: express.Response<LoginResponse>,
		next: NextFunction
	) => {
		try{
			const {email, password} = req.body;
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
			
			const token = generateToken(user._id);
			res.json({token});
		} catch(error){
			res.status(500);
			return next(new Error('Server error'))
		}
	}
)

export default router
