import { PrismaClient, Hotel, Room, Ticket, TicketType, Booking } from '@prisma/client';
import { prisma } from '@/config';

export async function getBooking(userId: number) {
  return 0;
}

export async function createBooking(userId: number, roomId: number) {
  return 0;
}

export async function listBookings(userId: number, roomId: number, bookingId: number) {
  return 0;
}
