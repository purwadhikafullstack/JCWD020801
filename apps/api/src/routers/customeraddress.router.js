import { Router } from 'express';
import { addressCreate, addressEdit, deleteById, getAll, getAllByCustomerId, getDeliveryAddress, setDefault, setDefaultAddress, setDeliveryAddress } from '../controllers/customeraddress.controller';
const { verifyToken } = require('../middleware/auth')

const customerAddressRouter = Router()

// GET
customerAddressRouter.get('/', getAll)
customerAddressRouter.get('/list', verifyToken, getAllByCustomerId)
customerAddressRouter.get('/delivery-address', verifyToken, getDeliveryAddress)

// POST
customerAddressRouter.post('/create', verifyToken, addressCreate)

// PATCH
customerAddressRouter.patch('/set-default/:id', verifyToken, setDefaultAddress)
customerAddressRouter.patch('/set-delivery-address/:id', verifyToken, setDeliveryAddress)
customerAddressRouter.patch('/edit/:id', verifyToken, addressEdit)

// DELETE
customerAddressRouter.delete('/delete/:id', verifyToken, deleteById)

export { customerAddressRouter }