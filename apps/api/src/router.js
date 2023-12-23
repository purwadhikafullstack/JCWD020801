import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { adminRouter } from './routers/admin.router';
import { categoryRouter } from './routers/category.router';
import { productRouter } from './routers/product.router';
import { customerRouter } from './routers/customer.router'

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/admins', adminRouter);
router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/customer', customerRouter)

// add another router here ...

export default router;
