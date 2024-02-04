import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { adminRouter } from './routers/admin.router';
// import { categoryRouter } from './routers/category.router';
import { productRouter } from './routers/product.router';
import { customerRouter } from './routers/customer.router';
import { customerAddressRouter } from './routers/customeraddress.router';
import { branchRouter } from './routers/branch.router';
import { provinceRouter } from './routers/province.router';
import { cityRouter } from './routers/city.router';
import { shippingCostRouter } from './routers/shippingcost.router';
import { paymentRouter } from './routers/payment.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/admins', adminRouter);
// router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/customer', customerRouter);
router.use('/customer-address', customerAddressRouter);
router.use('/branches', branchRouter);
router.use('/provinces', provinceRouter);
router.use('/cities', cityRouter);
router.use('/shipping', shippingCostRouter);
router.use('/payment', paymentRouter);

// add another router here ...

export default router;
