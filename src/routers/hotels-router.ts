import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import * as hotelsController from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter
  .get('/', authenticateToken, hotelsController.findAll)
  .get('/:hotelId', authenticateToken, hotelsController.findById);

export { hotelsRouter };
