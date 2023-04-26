import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import * as bookingsController from '@/controllers/bookings-controller';

const bookingsRouter = Router();

bookingsRouter
  .get('/', authenticateToken, bookingsController.getBooking)
  .post('/', authenticateToken, bookingsController.createBooking)
  .put('/:bookingId', authenticateToken, bookingsController.updateBooking);

export { bookingsRouter };
