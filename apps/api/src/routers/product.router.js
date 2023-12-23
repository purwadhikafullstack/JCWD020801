import { Router } from 'express'
import { addProduct, deleteProduct, editProduct, getAllProducts } from '../controllers/product.controller'

const productRouter = Router()

productRouter.get('/', getAllProducts);
productRouter.post('/', addProduct)
productRouter.patch('/', editProduct)
productRouter.patch('/', deleteProduct)

export { productRouter }