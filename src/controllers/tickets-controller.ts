import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.findAllTypes();

    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicketByUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const ticket = await ticketsService.getOneByUserId(userId);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function postCreateTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    await ticketsService.createTicket(
      {
        ...req.body,
      },
      userId,
    );

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}
