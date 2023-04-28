import { PrismaClient, Hotel, Room, Ticket, TicketType, Booking } from '@prisma/client';
import { prisma } from '@/config';

export async function getBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId: userId,
    },
  });
}

export async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
}

export async function updateBooking(userId: number, roomId: number, bookingId: number) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
}
