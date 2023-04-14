import { PrismaClient, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findOneByUserId(id: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
  });
  const type = await prisma.ticketType.findUnique({
    where: {
      id: ticket.ticketTypeId,
    },
  });

  return {
    ...ticket,
    TicketType: type,
  };
}

async function create(ticketTypeId: number, enrollmentId: number) {
  const ticket = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
  });
  const type = await prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  });

  return {
    ...ticket,
    TicketType: type,
  };
}

async function verifyEnrollment(id: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId: id,
    },
  });
}

const ticketsRepository = {
  findAllTypes,
  findOneByUserId,
  create,
  verifyEnrollment,
};

export default ticketsRepository;
