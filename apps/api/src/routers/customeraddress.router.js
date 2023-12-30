import { Router } from 'express';
import { addressCreate, addressEdit, deleteById, getAll, getAllByCustomerId, setDefault, setDefaultAddress } from '../controllers/customeraddress.controller';
const { verifyToken } = require('../middleware/auth')

const customerAddressRouter = Router()

// GET
customerAddressRouter.get('/', getAll)
customerAddressRouter.get('/list', verifyToken, getAllByCustomerId)

// POST
customerAddressRouter.post('/create', verifyToken, addressCreate)

// PATCH
customerAddressRouter.patch('/set-default/:id', verifyToken, setDefaultAddress)
customerAddressRouter.patch('/edit/:id', verifyToken, addressEdit)

// DELETE
customerAddressRouter.delete('/delete/:id', verifyToken, deleteById)

export { customerAddressRouter }