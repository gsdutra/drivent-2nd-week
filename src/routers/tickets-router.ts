import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketTypes, getTicketByUser, postCreateTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .get('/types', authenticateToken, getTicketTypes)
  .get('/', authenticateToken, getTicketByUser)
  .post('/', authenticateToken, postCreateTicket);

export { ticketsRouter };
