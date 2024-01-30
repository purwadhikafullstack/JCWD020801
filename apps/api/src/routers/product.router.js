import { Router } from 'express'
import { addProduct, deleteBranchProduct, deleteProduct, editProduct, getAllBranchProduct, getAllBranchProductCustomer, getAllProducts, getProductImages, getProductStockHistory, getTotalProduct, updateStockBranchProduct } from '../controllers/product.controller'
import { verifyTokenAdmin } from '../middleware/admin/admin.auth';
import { multerUpload } from '../middleware/admin/product.multer';

const productRouter = Router()

productRouter.get('/', verifyTokenAdmin, getAllProducts);
productRouter.post('/', verifyTokenAdmin, multerUpload().single("image1"), addProduct)
productRouter.patch('/', verifyTokenAdmin, editProduct)
productRouter.patch('/:id', verifyTokenAdmin, deleteProduct)
productRouter.get('/total', verifyTokenAdmin, getTotalProduct)
productRouter.get('/all', getAllBranchProductCustomer)

//product images
productRouter.get('/images/:id', getProductImages);

//branch products
productRouter.get('/branch-product', verifyTokenAdmin, getAllBranchProduct)
productRouter.patch('/branch-product/stock', verifyTokenAdmin, updateStockBranchProduct)
productRouter.delete('/branch-product/:id', verifyTokenAdmin, deleteBranchProduct)

//history
productRouter.get('/history', verifyTokenAdmin, getProductStockHistory)

export { productRouter }