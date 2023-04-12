import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const { ticketId } = req.query;

    const paymentInfo = await paymentsService.findFirst(Number(ticketId));

    return res.status(httpStatus.OK).send(paymentInfo);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  try {
    //implementar dps
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
