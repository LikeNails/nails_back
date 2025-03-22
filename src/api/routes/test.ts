import express, { NextFunction } from 'express'
import { authMiddleware } from '../../middlewares'


const router = express.Router()

router.post(
	'/test',
	authMiddleware,
	async (
		req: express.Request,
		res: express.Response,
		next: NextFunction
	) =>
	{
		try{
			res.status(200).json({message: 'all is ok'})
		}catch(error){
			next(error)
		}
	}
)
