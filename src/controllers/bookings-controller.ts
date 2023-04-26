import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import * as error from '@/errors';

import * as bookingsService from '@/services/bookings-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NoContent') return res.sendStatus(httpStatus.NO_CONTENT);
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === 'PaymentRequiredError') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  try {
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NoContent') return res.sendStatus(httpStatus.NO_CONTENT);
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === 'PaymentRequiredError') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  try {
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NoContent') return res.sendStatus(httpStatus.NO_CONTENT);
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === 'PaymentRequiredError') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
