import { jest } from '@jest/globals';
import * as bookingService from '../../src/services';
import * as bookingRepository from '../../src/repositories/booking-repository';

describe('booking test suite', () => {
  describe('getBooking service', () => {
    it('should return not found error if user does not have a booking', async () => {
      jest.spyOn(bookingRepository, 'getBooking').mockImplementationOnce(() => {
        return undefined;
      });

      const response = bookingService.getBooking(1);

      expect(response).rejects.toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    });
    it('should return user booking', async () => {
      const booking = {
        id: 1,
        userId: 1,
        roomId: 1,
        Room: {
          id: 1,
          name: 'room 1',
          capacity: 1,
          hotelId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(booking);

      const response = await bookingService.getBooking(1);
      expect(response).toEqual({ id: booking.id, Room: booking.Room });
    });
  });

  describe('createBooking service', () => {
    0;
  });

  describe('updateBooking service', () => {
    0;
  });
});
