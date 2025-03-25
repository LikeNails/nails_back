import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

export const generateRefreshToken = (user_id: ObjectId): string => {
	return jwt.sign({ user_id: user_id}, process.env.REFFRESH_TOKEN_SECRET!, { expiresIn: '7d'})
}

export const generateAccessToken = (user_id: ObjectId): string => {
	return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '15m'});
}

