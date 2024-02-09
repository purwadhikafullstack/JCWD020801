import { Router } from 'express';
import {
  userRegister,
  getAllUser,
  userVerification,
  userLogin,
  keepLogin,
  userRegisterWithGoogle,
  userImgUpdate,
  userDataUpdate,
  userLogout,
  resetPassword,
  resetPasswordVerification,
  findEmailForgotPassword,
  userEmailUpdate,
  userSignInWithGoogle,
  userEmailUpdateVerification,
  userReverification,
  userLoginWithGoogle,
  getTotalCustomer,
  getAllCustomer,
  userDataCheck,
} from '../controllers/customer.controller';
import { verifyTokenAdmin } from '../middleware/admin/admin.auth';
const { verifyToken } = require('../middleware/auth');
const { multerUpload } = require('../middleware/multer');
const customerRouter = Router();

// GET
customerRouter.get('/', async (req, res) => {
  const result = await getAllUser();
  res.json({ result });
});
customerRouter.get('/user-signin', userLogin);
customerRouter.get('/keep-login', verifyToken, keepLogin);
customerRouter.get('/reset-password', verifyToken, resetPassword);
customerRouter.get('/forgot-password', findEmailForgotPassword);
customerRouter.get('/email-reverification', userReverification);
customerRouter.get('/total', verifyTokenAdmin, getTotalCustomer);
customerRouter.get('/all', verifyTokenAdmin, getAllCustomer);
customerRouter.get('/data-check', verifyToken, userDataCheck)

// POST
customerRouter.post('/register', userRegister);
customerRouter.post('/register-google', userRegisterWithGoogle);
customerRouter.post('/signin-google', userLoginWithGoogle);
customerRouter.post('/user-logout', userLogout);

// PATCH
customerRouter.patch('/verification', verifyToken, userVerification);
customerRouter.patch(
  '/img-update',
  verifyToken,
  multerUpload().single('profile_picture'),
  userImgUpdate,
);
customerRouter.patch('/data-update', verifyToken, userDataUpdate);
customerRouter.patch(
  '/reset-password-verification',
  verifyToken,
  resetPasswordVerification,
);
customerRouter.patch('/email-update', verifyToken, userEmailUpdate);
customerRouter.patch(
  '/email-update-verification',
  verifyToken,
  userEmailUpdateVerification,
);

export { customerRouter };
