import { Router } from 'express';
import { authenticateToken, validateBody, handleApplicationErrors } from '@/middlewares';
import * as bookingsController from '@/controllers/booking-controller';

const bookingsRouter = Router();

bookingsRouter
  .get('/', authenticateToken, bookingsController.getBooking, handleApplicationErrors)
  .post('/', authenticateToken, bookingsController.createBooking, handleApplicationErrors)
  .put('/:bookingId', authenticateToken, bookingsController.updateBooking, handleApplicationErrors);

export { bookingsRouter };
