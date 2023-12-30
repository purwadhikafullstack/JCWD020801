import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { customerRouter } from './routers/customer.router'
import { customerAddressRouter } from './routers/customeraddress.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/customer', customerRouter)
router.use('/customer-address', customerAddressRouter)

// add another router here ...

export default router;
