import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { calculateShippingCost } from '../controllers/shippingcost.controller';

const shippingCostRouter = Router()

shippingCostRouter.post('/calculate-cost', verifyToken, calculateShippingCost)

export { shippingCostRouter }