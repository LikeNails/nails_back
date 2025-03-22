import express, { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { RegisterRequestBody} from '../types/Register/RegisterRequestBody'
import { RegisterResponse } from '../types/Register/RegisterResponse'
import User from '../../models/User'
import generateToken from '../utils/generateToken'

const router = express.Router()

router.post(
	'/register', 
	async(
		req: express.Request<{},{}, RegisterRequestBody>,
		res: express.Response<RegisterResponse>,
		next: NextFunction,
	) => {
		try{
			const {email, password} = req.body
			const existingUser = await User.findOne({ email })
			if (existingUser){
				res.status(400)
				return next(new Error('User is already created'))
			}
			
			const user = new User({email, password})
			await user.save();
			
			const token = generateToken(user._id)
			res.status(201).json({token});
		} catch(error) {
			res.status(500)
			return next(new Error('Server error'))
		}
	}
)