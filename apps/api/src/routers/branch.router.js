import { Router } from 'express';
import { checkRoleAdmin, verifyTokenAdmin } from '../middleware/admin/admin.auth';
import { addBranch, changeStatus, deleteById, editBranch, getAll, getAllbyAdminId, getById, getNearestBranch, getSuperStore, getTotalBranch} from '../controllers/branch.controller';

const branchRouter = Router()

// GET
branchRouter.get('/', verifyTokenAdmin, getAll)
branchRouter.get('/total', verifyTokenAdmin, getTotalBranch)
branchRouter.get('/super-store', getSuperStore)
branchRouter.get('/assigned', verifyTokenAdmin, getAllbyAdminId)
branchRouter.get('/:id', verifyTokenAdmin, checkRoleAdmin, getById)

// test
branchRouter.get('/at-checkout/:id', getById)

// POST
branchRouter.post('/get-nearest', getNearestBranch)
branchRouter.post('/', verifyTokenAdmin, checkRoleAdmin, addBranch)

// PATCH
branchRouter.patch('/:id', verifyTokenAdmin, checkRoleAdmin, editBranch)
branchRouter.patch('/change-status/:id', verifyTokenAdmin, checkRoleAdmin, changeStatus)
branchRouter.patch('/delete/:id', verifyTokenAdmin, checkRoleAdmin, deleteById)

export { branchRouter }