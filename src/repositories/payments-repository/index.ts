import { PrismaClient, Payment } from '@prisma/client';
import { prisma } from '@/config';
import { CardData } from '@/protocols';

async function verifyTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });
}

async function verifyIfTicketBelongsToUser(ticketId: number, userId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
      Enrollment: {
        userId,
      },
    },
  });
}

async function findFirst(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function verifyIfBelongsToUser(ticketId: number, userId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
      Ticket: {
        Enrollment: {
          userId,
        },
      },
    },
  });
}

async function createPayment(ticketId: number, cardIssuer: string, cardLastDigits: string, value: number) {
  return prisma.payment.create({
    data: {
      ticketId,
      cardIssuer,
      cardLastDigits,
      value,
    },
  });
}

async function setTicketStatusAsPaid(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}

async function findPrice(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}

const paymentsRepository = {
  findFirst,
  createPayment,
  verifyIfBelongsToUser,
  verifyTicketId,
  verifyIfTicketBelongsToUser,
  setTicketStatusAsPaid,
  findPrice,
};

export default paymentsRepository;
