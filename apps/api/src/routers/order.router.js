import { Router } from 'express';
import { addOrder } from '../controllers/order.controller';

import { verifyToken } from '../middleware/auth';

const orderRouter = Router();

orderRouter.post('/', addOrder);
// productRouter.get('/', verifyTokenAdmin, getAllProducts);
// productRouter.post('/', verifyTokenAdmin, multerUpload().single("image1"), addProduct)
// productRouter.patch('/', verifyTokenAdmin, editProduct)
// productRouter.patch('/:id', verifyTokenAdmin, deleteProduct)
// productRouter.get('/total', verifyTokenAdmin, getTotalProduct)

//product images
// productRouter.get('/images/:id', getProductImages);

export { orderRouter };
