import { Router } from 'express';
import { fetchAndPostProvinces, getAllProvince } from '../controllers/province.controller';
import { verifyToken } from '../middleware/auth';

const provinceRouter = Router()

// GET
provinceRouter.get('/', getAllProvince)

// POST
provinceRouter.post('/', fetchAndPostProvinces);

export { provinceRouter }