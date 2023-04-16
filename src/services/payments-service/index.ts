import paymentsRepository from '@/repositories/payments-repository';
import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import { Payment, CardData } from '@/protocols';

async function findFirst(ticketId: number, userId: number) {
  if (!ticketId) throw invalidDataError(['Ticket id is required']);
  const payment = await paymentsRepository.findFirst(ticketId);
  if (!payment) throw notFoundError();
  const verifyIfBelongsToUser = await paymentsRepository.verifyIfBelongsToUser(ticketId, userId);
  if (!verifyIfBelongsToUser) throw unauthorizedError();
  return payment;
}

async function createPayment(ticketId: number, userId: number, cardData: CardData) {
  if (!cardData || !ticketId) throw invalidDataError(['Ticket id and card data are required']);

  const verifyTicketId = await paymentsRepository.verifyTicketId(ticketId);
  if (!verifyTicketId) throw notFoundError();

  const verifyIfTicketBelongsToUser = await paymentsRepository.verifyIfTicketBelongsToUser(ticketId, userId);
  if (!verifyIfTicketBelongsToUser) throw unauthorizedError();

  await paymentsRepository.setTicketStatusAsPaid(ticketId);

  const cardIssuer = cardData.issuer;
  const cardLastDigits = String(cardData.number).slice(-4);
  const value = await paymentsRepository.findPrice(verifyTicketId.ticketTypeId);

  const payment = await paymentsRepository.createPayment(ticketId, cardIssuer, cardLastDigits, Number(value));

  return payment;
}

const paymentsService = {
  findFirst,
  createPayment,
};

export default paymentsService;
