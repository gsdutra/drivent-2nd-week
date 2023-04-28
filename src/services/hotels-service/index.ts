import * as hotelsRepository from '@/repositories/hotels-repository';
import * as error from '@/errors';

export async function findAll(userId: number) {
  const verifyTicket = await hotelsRepository.verifyTicket(userId);
  if (!verifyTicket) throw error.notFoundError();

  if (
    verifyTicket.status !== 'PAID' ||
    verifyTicket.TicketType.includesHotel === false ||
    verifyTicket.TicketType.isRemote === true
  )
    throw error.paymentRequiredError();

  const hotels = await hotelsRepository.getAll();

  if (hotels.length === 0) throw error.notFoundError();

  return hotels;
}

export async function findById(userId: number, hotelId: number) {
  const verifyTicket = await hotelsRepository.verifyTicket(userId);
  if (!verifyTicket) throw error.notFoundError();

  if (
    verifyTicket.status !== 'PAID' ||
    verifyTicket.TicketType.includesHotel === false ||
    verifyTicket.TicketType.isRemote === true
  )
    throw error.paymentRequiredError();

  const hotels = await hotelsRepository.getById(hotelId);

  //console.log(hotels);

  if (!hotels) throw error.notFoundError();

  return hotels;
}
