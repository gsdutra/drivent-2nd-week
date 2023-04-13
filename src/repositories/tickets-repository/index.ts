import { PrismaClient, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findOneByUserId(id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
  });
}

async function create(ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.ticket.create({
    data: ticket,
  });
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
