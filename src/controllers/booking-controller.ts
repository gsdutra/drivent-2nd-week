import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import * as error from '@/errors';

import * as bookingsService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const response = await bookingsService.getBooking(userId);

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { roomId } = req.body;

    const response = await bookingsService.createBooking(userId, roomId);

    res.status(httpStatus.OK).send({ bookingId: response });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'ForbiddenError') return res.sendStatus(httpStatus.FORBIDDEN);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { roomId } = req.body;
    const bookingId = Number(req.params.bookingId);

    const response = await bookingsService.updateBooking(userId, roomId, bookingId);

    res.status(httpStatus.OK).send({ bookingId: response });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'ForbiddenError') return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
