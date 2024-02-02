import { Router } from 'express'
import { addProduct, deleteProduct, editProduct, getAllProducts, getProductImages, getTotalProduct } from '../controllers/product.controller'
import { verifyTokenAdmin } from '../middleware/admin/admin.auth';
import { multerUpload } from '../middleware/admin/product.multer';

const productRouter = Router()

productRouter.get('/', verifyTokenAdmin, getAllProducts);
productRouter.post('/', verifyTokenAdmin, multerUpload().single("image1"), addProduct)
productRouter.patch('/', verifyTokenAdmin, editProduct)
productRouter.patch('/:id', verifyTokenAdmin, deleteProduct)
productRouter.get('/total', verifyTokenAdmin, getTotalProduct)

//product images
productRouter.get('/images/:id', getProductImages);

export { productRouter }