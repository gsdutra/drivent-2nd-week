import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';

const ticketsRouter = Router();

export { ticketsRouter };
