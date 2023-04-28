import { PrismaClient, Hotel, Room, Ticket, TicketType, Booking } from '@prisma/client';
import { prisma } from '@/config';

export async function getBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    include: {
      Room: true,
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

export async function verifyBooking(userId: number, bookingId: number) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
    },
  });
}

export async function verifyRoom(roomId: number) {
  return await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
}

export async function verifyRoomAvailability(roomId: number) {
  return await prisma.booking.count({
    where: {
      roomId: roomId,
    },
  });
}
