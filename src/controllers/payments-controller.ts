import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { invalidDataError } from '@/errors';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const { ticketId } = req.query;

    const { userId } = req;

    const paymentInfo = await paymentsService.findFirst(Number(ticketId), Number(userId));

    return res.status(httpStatus.OK).send(paymentInfo);
  } catch (error) {
    if (error.name === 'NoContent') return res.sendStatus(httpStatus.NO_CONTENT);
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req;
    const { ticketId, cardData } = req.body;

    const payment = await paymentsService.createPayment(Number(ticketId), Number(userId), cardData);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NoContent') return res.sendStatus(httpStatus.NO_CONTENT);
    if (error.name === 'InvalidDataError') return res.status(httpStatus.BAD_REQUEST).send(error.message);
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
