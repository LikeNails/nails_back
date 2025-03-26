import express from 'express';
import login from './routes/login';
import logout from './routes/logout';
import refresh from './routes/refresh'
import register from './routes/register/register'
import test from './routes/test'
import testb from './routes/testb'

const router = express.Router()

router.use('/login', login)
router.use('/register', register)
router.use('/logout', logout)
router.use('/refresh', refresh)
router.use('/test', test)
router.use('/testb', testb)

export default router