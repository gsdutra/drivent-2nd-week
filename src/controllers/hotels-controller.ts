import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

import * as hotelsService from '@/services/hotels-service';

export async function findAll(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const response = await hotelsService.findAll(userId);

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === 'NoContent') return res.sendStatus(httpStatus.NO_CONTENT);
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function findById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { hotelId } = req.params;

    const response = await hotelsService.findById(userId, Number(hotelId));

    res.sendStatus(200);
  } catch (error) {
    if (error.name === 'NoContent') return res.sendStatus(httpStatus.NO_CONTENT);
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
