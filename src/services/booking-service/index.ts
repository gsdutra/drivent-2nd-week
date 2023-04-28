import * as bookingRepository from '@/repositories/booking-repository';
import * as error from '@/errors';

export async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);

  if (!booking) throw error.notFoundError();

  return booking;
}

export async function createBooking(userId: number, roomId: number) {
  return 0;
}

export async function updateBooking(userId: number, roomId: number, bookingId: number) {
  return 0;
}
