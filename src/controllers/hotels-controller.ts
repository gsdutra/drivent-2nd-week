import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

import * as hotelsService from '@/services/hotels-service';

export async function findAll(req: AuthenticatedRequest, res: Response) {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

export async function findById(req: AuthenticatedRequest, res: Response) {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
