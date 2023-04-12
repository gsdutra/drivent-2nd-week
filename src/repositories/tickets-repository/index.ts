import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findAllTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketsByUserId(id: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
  });
}

async function create(ticket: Prisma.TicketCreateInput) {
  return prisma.ticket.create({
    data: ticket,
  });
}

const ticketsRepository = {
  findAllTypes,
  findTicketsByUserId,
  create,
};

export default ticketsRepository;
