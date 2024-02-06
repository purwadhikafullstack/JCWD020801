import { Router } from 'express';
// import { verifyToken } from '../middleware/auth';
import {
  createOderDetail,
  getAllOrderDetails,
} from '../controllers/orderdetails.controller';

const orderDetailsRouter = Router();

orderDetailsRouter.post('/', createOderDetail);
orderDetailsRouter.get('/', getAllOrderDetails);

export { orderDetailsRouter };
