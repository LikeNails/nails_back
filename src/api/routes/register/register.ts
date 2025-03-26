import express, { NextFunction } from 'express'
import { User, TUser} from '../../../models/User'
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken'
import { RegisterResponse } from './registerTypes'
import { registerSchema } from './registerValidation'

const router = express.Router()


const allowedTypes = ['student', 'teacher']

router.post(
	'', 
	async(
		req: express.Request<{},{}, TUser>,
		res: express.Response<RegisterResponse>,
		next: NextFunction,
	) => {
		try{
			
			const {error} = registerSchema.validate(req.body, { abortEarly: false})
			if(error){
				return next(new Error(`Ошибка валидации \n ${error}`))
			}
			
			const {email, password_hash: password, type, bio} = req.body
			
			if(!allowedTypes.includes(type)){
				res.status(400)
				return next(new Error('Invalid user type'))
			}
			
			const existingUser = await User.findOne({ email })
			if (existingUser){
				res.status(400)
				return next(new Error('User is already created'))
			}
			
		
			
			
			
			const user = new User({email, password_hash: password, type, bio})
			
			if(type == 'student'){
				user.group = req.body.group
			}
			
			if(type == 'teacher'){
				user.teacher_info = req.body.teacher_info
			}
			
			const accessToken = generateAccessToken(user._id)
			const refreshToken = generateRefreshToken(user._id)
			
			user.refresh_token = refreshToken
			
			await user.save();
			
			res.status(201).json({accessToken});
		} catch(error) {
			res.status(500)
			return next(new Error(`Server error \n ${error}`))
		}
	}
)

export default router