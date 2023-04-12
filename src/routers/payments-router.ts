import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPaymentByTicketId, postPayment } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.get('/', authenticateToken, getPaymentByTicketId).post('/process', authenticateToken, postPayment);

export { paymentsRouter };
