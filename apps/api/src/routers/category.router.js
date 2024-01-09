import { Router } from 'express';
import { addCategory, deleteCategory, getAllCategory, updateCategory } from '../controllers/category.controller';
import { verifyTokenAdmin } from '../middleware/admin/admin.auth';

const categoryRouter = Router()

categoryRouter.post('/', verifyTokenAdmin, addCategory);
categoryRouter.get('/', verifyTokenAdmin, getAllCategory);
categoryRouter.delete('/:id', verifyTokenAdmin, deleteCategory)
categoryRouter.patch('/', verifyTokenAdmin, updateCategory)

export { categoryRouter };