import { Router } from 'express';
import {
  createAdmin,
  deleteAdmin,
  forgotPassword,
  getAllAdmin,
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


const adminRouter = Router();

adminRouter.post('/', verifyTokenAdmin, checkRoleAdmin, checkRegisterAdmin, createAdmin); //create a new admin
adminRouter.get('/', verifyTokenAdmin, checkRoleAdmin, getAllAdmin); //get all admins
adminRouter.delete('/:id', verifyTokenAdmin, checkRoleAdmin, deleteAdmin); //delete admin by id
adminRouter.patch('/', verifyTokenAdmin, updateAdmin) //edit an admin
adminRouter.patch('/verification', verifyTokenAdmin, updateVerifiedAdmin) //verify admin account
adminRouter.post('/login', checkLoginAdmin, loginAdmin)
adminRouter.get('/keep-login', verifyTokenAdmin, keepLoginAdmin);
adminRouter.get('/total', verifyTokenAdmin, getTotalAdmin)
adminRouter.post('/logout', verifyTokenAdmin, logoutAdmin)
adminRouter.get('/forgot-password', forgotPassword)
adminRouter.patch('/password', verifyTokenAdmin, updatePasswordAdmin)
adminRouter.get('/vercode', verifyTokenAdmin, getVerCode);

export { adminRouter };
