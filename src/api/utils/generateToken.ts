import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const generateRefreshToken = (
	user_id: mongoose.Schema.Types.ObjectId,
): string => {
	return jwt.sign({ user_id: user_id }, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: '7d',
	})
}

export const generateAccessToken = (
	user_id: mongoose.Schema.Types.ObjectId,
): string => {
	return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: '15m',
	})
}
