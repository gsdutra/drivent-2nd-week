import ticketsRepository from '@/repositories/tickets-repository';
import { invalidDataError, notFoundError } from '@/errors';
import { Ticket, TicketType } from '@/protocols';

async function findAllTypes(): Promise<TicketType[]> {
  const types = await ticketsRepository.findAllTypes();

  return types;
}

async function getOneByUserId(userId: number): Promise<Ticket> {
  await verifyEnrollment(userId);
  const ticket = await ticketsRepository.findOneByUserId(userId);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number): Promise<Ticket> {
  const enrollmentId = await verifyEnrollment(userId);
  const createdTicket = await ticketsRepository.create(ticketTypeId, enrollmentId);

  if (!createdTicket) throw invalidDataError(['invalid ticket']);

  return createdTicket;
}

async function verifyEnrollment(userId: number) {
  const verify = await ticketsRepository.verifyEnrollment(userId);
  // console.log(verify, verify === null, null);
  if (verify === null) throw notFoundError();
  // console.log(verify);
  return verify.id;
}

const ticketsService = {
  findAllTypes,
  getOneByUserId,
  createTicket,
};

export default ticketsService;
