import { Router } from 'express';
import { verifyTokenAdmin } from '../middleware/admin/admin.auth';
import { addVoucher, getCustomerVoucher } from '../controllers/voucher.controller';
import { verifyToken } from '../middleware/auth';

const voucherRouter = Router()

// POST
voucherRouter.post('/', verifyTokenAdmin, addVoucher)

// GET
voucherRouter.get('/customer', verifyToken, getCustomerVoucher)

export { voucherRouter }