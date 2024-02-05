import { Router } from 'express';
import {
  createAdmin,
  deleteAdmin,
  forgotPassword,
  getAllAdmin,
  getAllAdminNoPagination,
  getTotalAdmin,
  getVerCode,
  keepLoginAdmin,
  loginAdmin,
  logoutAdmin,
  updateAdmin,
  updatePasswordAdmin,
  updateVerifiedAdmin
} from '../controllers/admin.controller';
import { checkRoleAdmin, verifyTokenAdmin } from '../middleware/admin/admin.auth';
import { checkLoginAdmin, checkRegisterAdmin } from '../middleware/admin/admin.validator';
import { multerUpload } from '../middleware/admin/product.multer';

const adminRouter = Router();

adminRouter.post('/', verifyTokenAdmin, checkRoleAdmin, checkRegisterAdmin, createAdmin); //create a new admin
adminRouter.get('/', verifyTokenAdmin, checkRoleAdmin, getAllAdmin); //get all admins
adminRouter.get('/no-pagination', verifyTokenAdmin, checkRoleAdmin, getAllAdminNoPagination) // get all admin without pagination
adminRouter.delete('/:id', verifyTokenAdmin, checkRoleAdmin, deleteAdmin); //delete admin by id
adminRouter.patch('/', verifyTokenAdmin, multerUpload().single("image"), updateAdmin) //edit an admin
adminRouter.patch('/verification', verifyTokenAdmin, updateVerifiedAdmin) //verify admin account
adminRouter.post('/login', checkLoginAdmin, loginAdmin)
adminRouter.get('/keep-login', verifyTokenAdmin, keepLoginAdmin);
adminRouter.get('/total', verifyTokenAdmin, getTotalAdmin)
adminRouter.post('/logout', verifyTokenAdmin, logoutAdmin)
adminRouter.get('/forgot-password', forgotPassword)
adminRouter.patch('/password', verifyTokenAdmin, updatePasswordAdmin)
adminRouter.get('/vercode', verifyTokenAdmin, getVerCode);

export { adminRouter };
