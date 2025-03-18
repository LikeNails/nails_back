import express from 'express'
import LoginRequest from '../types/Login/request'
import LoginResponse from '../types/Login/response'

const router = express.Router()

router.get<LoginRequest, LoginResponse>('/', (req, res) => {
	res.json({
		auth_key: '23123123123',
		user_id: 1,
	})
})

export default router
