import { Router } from 'express'
import { addProduct, deleteBranchProduct, deleteProduct, deleteProductImage, editProduct, getAllBranchProduct, getAllBranchProductCustomer, getAllProducts, getProductBranchById, getProductImages, getProductImages2, getProductStockHistory, getTotalProduct, updateStockBranchProduct } from '../controllers/product.controller'
import { verifyTokenAdmin } from '../middleware/admin/admin.auth';
import { multerUpload } from '../middleware/admin/product.multer';
import { addDiscount, deleteDiscount, getAllDiscount, getTotalDiscount, updateDiscount } from '../controllers/discount.controller';

const productRouter = Router()

productRouter.get('/', verifyTokenAdmin, getAllProducts);
productRouter.post('/', verifyTokenAdmin, multerUpload().single("image1"), addProduct)
productRouter.patch('/', verifyTokenAdmin, multerUpload().single("product_image"), editProduct)
productRouter.patch('/:id', verifyTokenAdmin, deleteProduct)
productRouter.get('/total', verifyTokenAdmin, getTotalProduct)
productRouter.get('/all', getAllBranchProductCustomer)

//product images
productRouter.get('/images/:id', getProductImages);
productRouter.get('/images-all/:id', getProductImages2);
productRouter.delete('/images', verifyTokenAdmin, deleteProductImage)

//branch products
productRouter.get('/branch-product', verifyTokenAdmin, getAllBranchProduct)
productRouter.patch('/branch-product/stock', verifyTokenAdmin, updateStockBranchProduct)
productRouter.delete('/branch-product/:id', verifyTokenAdmin, deleteBranchProduct)
productRouter.get('/branch-product/:id/:branch_id', getProductBranchById)

//branch product discount
productRouter.post('/discount', verifyTokenAdmin, addDiscount)
productRouter.patch('/discount/edit', verifyTokenAdmin, updateDiscount)
productRouter.get('/discount', verifyTokenAdmin, getAllDiscount)
productRouter.get('/discount/total', verifyTokenAdmin, getTotalDiscount)
productRouter.delete('/discount/:id', verifyTokenAdmin, deleteDiscount)

//history
productRouter.get('/history', verifyTokenAdmin, getProductStockHistory)

export { productRouter }