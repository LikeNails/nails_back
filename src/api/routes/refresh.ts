import express, { NextFunction } from 'express'
import User from '../../models/User'
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateToken'
const router = express.Router()
import { JwtPayload } from 'jsonwebtoken'

router.post('/refresh', async (
	req: express.Request,
	res: express.Response,
	next: NextFunction
) => {
	try{
		const { refresh_token } = req.body
		
		if(!refresh_token) {
			res.status(401)
			return next(new Error('No refresh token provided'))
				
		}
		const user = await User.findOne({ refresh_token })
		if(!user) {
			res.status(403);
			return next(new Error('Invalid refresh token'));
		}
		
		try{
			const decoded = jwt.verify(refresh_token, process.env.TOKEN_SECRET!) as JwtPayload
			if(decoded && decoded.user_id === user._id.toString()){
				const newAccessToken = generateAccessToken(user._id)
				res.json({access_token: newAccessToken})
			}
			else{
				throw new Error('Invalid token')
			}
		}catch(err){
			res.status(403)
			next (new Error('Invalid or expired refresh token'))
		}

	} catch(error){
		res.status(500)
		return next(new Error('Server error'))
	}
})

export default router