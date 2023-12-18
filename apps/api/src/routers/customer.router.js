import { Router } from 'express';
import { userRegister, getAllUser, userVerification, userLogin, keepLogin, userRegisterWithGoogle } from '../controllers/customer.controller'

const { verifyToken } = require('../middleware/auth')
const customerRouter = Router();

// GET
customerRouter.get('/', async (req, res) => {
    const result = await getAllUser();
    res.json({ result })
})
customerRouter.get('/user-signin', userLogin)
customerRouter.get('/keep-login', verifyToken, keepLogin)

// POST
customerRouter.post('/register', userRegister)
customerRouter.post('/register-google', userRegisterWithGoogle)

// PATCH
customerRouter.patch('/verification', verifyToken, userVerification)

export { customerRouter }