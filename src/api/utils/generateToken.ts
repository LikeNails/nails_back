import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

const generateToken = (user_id:ObjectId):string => {
	return jwt.sign({ user_id}, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export default generateToken
