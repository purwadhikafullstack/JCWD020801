import { Router } from 'express';
import { fetchAndPostCities, getAllCities } from '../controllers/city.controller';

const cityRouter = Router()

// GET
cityRouter.get('/', getAllCities)

// POST
cityRouter.post('/', fetchAndPostCities)

export { cityRouter }