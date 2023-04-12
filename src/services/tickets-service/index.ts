import ticketsRepository from '@/repositories/tickets-repository';
import { invalidDataError, notFoundError } from '@/errors';
import { Ticket, TicketType } from '@/protocols';

async function findAllTypes(): Promise<TicketType[]> {
  const types = await ticketsRepository.findAllTypes();

  return types;
}

async function getOneByUserId(userId: number): Promise<Ticket> {
  const ticket = await ticketsRepository.findOneByUserId(userId);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(ticket: Ticket): Promise<Ticket> {
  const createdTicket = await ticketsRepository.create(ticket);

  if (!createdTicket) throw invalidDataError(['invalid ticket']);

  return createdTicket;
}

const ticketsService = {
  findAllTypes,
  getOneByUserId,
  createTicket,
};

export default ticketsService;
