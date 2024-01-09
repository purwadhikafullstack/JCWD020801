import { Router } from 'express';
import { checkRoleAdmin, verifyTokenAdmin } from '../middleware/admin/admin.auth';
import { addBranch, changeStatus, editBranch, getAll, getById, getNearestBranch, getSuperStore } from '../controllers/branch.controller';

const branchRouter = Router()

// GET
branchRouter.get('/', verifyTokenAdmin, checkRoleAdmin, getAll)
branchRouter.get('/super-store', getSuperStore)
branchRouter.get('/:id', verifyTokenAdmin, checkRoleAdmin, getById)

// POST
branchRouter.post('/get-nearest', getNearestBranch)
branchRouter.post('/', verifyTokenAdmin, checkRoleAdmin, addBranch)

// PATCH
branchRouter.patch('/:id', verifyTokenAdmin, checkRoleAdmin, editBranch)
branchRouter.patch('/change-status/:id', verifyTokenAdmin, checkRoleAdmin, changeStatus)

export { branchRouter }