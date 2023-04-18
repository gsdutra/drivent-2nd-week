import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

import * as hotelsService from '@/services/hotels-service';

export async function findAll(req: AuthenticatedRequest, res: Response) {
  return 0;
}

export async function findById(req: AuthenticatedRequest, res: Response) {
  return 0;
}
