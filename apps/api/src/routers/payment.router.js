import { Router } from 'express';
// import { verifyToken } from '../middleware/auth';
import { tokenMidtrans } from '../controllers/payment.controller';

const paymentRouter = Router();

paymentRouter.post('/tokenizer', tokenMidtrans);

export { paymentRouter };
