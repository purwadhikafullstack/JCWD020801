import { Router } from 'express';
import { addOrder, createPayment } from '../controllers/order.controller';

import { verifyToken } from '../middleware/auth';

const orderRouter = Router();

orderRouter.post('/', verifyToken, addOrder);
orderRouter.patch('/', createPayment);

export { orderRouter };
