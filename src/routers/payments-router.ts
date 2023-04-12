import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';

const paymentsRouter = Router();

export { paymentsRouter };
