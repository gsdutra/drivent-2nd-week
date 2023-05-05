import { Booking } from '@prisma/client';
import * as bookingRepository from '@/repositories/booking-repository';
import * as hotelsRepository from '@/repositories/hotels-repository';
import * as error from '@/errors';

export async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);

  if (!booking) throw error.notFoundError();

  return { id: booking.id, Room: booking.Room };
}

export async function createBooking(userId: number, roomId: number) {
  const verifyTicket = await hotelsRepository.verifyTicket(userId);

  if (
    verifyTicket.status === 'RESERVED' ||
    verifyTicket.TicketType.isRemote === true ||
    verifyTicket.TicketType.includesHotel === false
  )
    throw error.forbiddenError();

  const room = await bookingRepository.verifyRoom(roomId);
  if (!room) throw error.notFoundError();

  const verifyRoomAvailability: number = await bookingRepository.verifyRoomAvailability(roomId);
  if (verifyRoomAvailability >= room.capacity) throw error.forbiddenError();

  const booking = await bookingRepository.createBooking(userId, roomId);

  return booking.id;
}

export async function updateBooking(userId: number, roomId: number, bookingId: number) {
  const verifyTicket = await hotelsRepository.verifyTicket(userId);

  if (
    verifyTicket.status === 'RESERVED' ||
    verifyTicket.TicketType.isRemote === true ||
    verifyTicket.TicketType.includesHotel === false
  )
    throw error.forbiddenError();

  const room = await bookingRepository.verifyRoom(roomId);
  if (!room) throw error.notFoundError();

  const verifyRoomAvailability = await bookingRepository.verifyRoomAvailability(roomId);
  if (verifyRoomAvailability >= room.capacity) throw error.forbiddenError();

  const verifyBooking = await bookingRepository.verifyBooking(userId, bookingId);
  if (!verifyBooking) throw error.forbiddenError();

  const booking: Booking = await bookingRepository.updateBooking(userId, roomId, bookingId);

  return booking.id;
}
