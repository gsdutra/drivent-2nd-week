import { PrismaClient, Hotel, Room, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

export async function getAll(): Promise<Hotel[]> {
  return prisma.hotel.findMany({});
}

export async function getById(id: number): Promise<Hotel & { Rooms: Room[] }> {
  return prisma.hotel.findFirst({
    where: {
      id,
    },
    include: {
      Rooms: true,
    },
  });
}

export async function verifyTicket(userId: number): Promise<Ticket & { TicketType: TicketType }> {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}
