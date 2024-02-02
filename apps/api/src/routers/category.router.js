import { Router } from 'express';
import { addCategory, deleteCategory, deleteSubCategory, getAllCategory, getAllSubCategory, getAllSubCategoryById, removeSubCategoryOfCategory, updateCategory } from '../controllers/category.controller';
import { verifyTokenAdmin } from '../middleware/admin/admin.auth';

const categoryRouter = Router()

//category
categoryRouter.post('/', verifyTokenAdmin, addCategory);
categoryRouter.get('/', verifyTokenAdmin, getAllCategory);
categoryRouter.delete('/:id', verifyTokenAdmin, deleteCategory)
categoryRouter.patch('/', verifyTokenAdmin, updateCategory)

//Sub-category
categoryRouter.get('/sub-category', verifyTokenAdmin, getAllSubCategory)
categoryRouter.get('/sub-category/:id', verifyTokenAdmin, getAllSubCategoryById)
categoryRouter.patch('/sub-category/remove', verifyTokenAdmin, removeSubCategoryOfCategory)
categoryRouter.delete('/sub-category/:id', verifyTokenAdmin, deleteSubCategory)

export { categoryRouter };