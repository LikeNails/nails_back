import express, { NextFunction } from 'express'


const router = express.Router()

router.get(
	'/',
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

export default router