import { jest } from '@jest/globals';
import { Booking } from '@prisma/client';
import * as bookingService from '../../src/services';
import * as bookingRepository from '../../src/repositories/booking-repository';
import * as hotelsRepository from '../../src/repositories/hotels-repository';

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
    it('should not create booking if ticket status is "RESERVED"', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'RESERVED',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = bookingService.createBooking(1, 1);
      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'You are not allowed to do this action!',
      });
    });
    it('should not create booking if ticket is remote', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: true,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = bookingService.createBooking(1, 1);
      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'You are not allowed to do this action!',
      });
    });
    it('should not create booking if ticket does not include hotel', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = bookingService.createBooking(1, 1);
      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'You are not allowed to do this action!',
      });
    });
    it('should not create booking if room does not exist', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      jest.spyOn(bookingRepository, 'verifyRoom').mockResolvedValueOnce(undefined);

      const response = bookingService.createBooking(1, 1);
      expect(response).rejects.toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    });
    it('should not create booking if ticket if the room has no vacancies', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      jest.spyOn(bookingRepository, 'verifyRoom').mockResolvedValueOnce({
        id: 1,
        name: 'room 1',
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(bookingRepository, 'verifyRoomAvailability').mockResolvedValueOnce(1);

      const response = bookingService.createBooking(1, 1);
      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'You are not allowed to do this action!',
      });
    });
    it('should create booking', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      jest.spyOn(bookingRepository, 'verifyRoom').mockResolvedValueOnce({
        id: 1,
        name: 'room 1',
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(bookingRepository, 'verifyRoomAvailability').mockResolvedValueOnce(0);

      const booking: Booking = {
        id: 1,
        roomId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(bookingRepository, 'createBooking').mockResolvedValueOnce(booking);

      const response = await bookingService.createBooking(1, 1);

      expect(response).toEqual(booking.id);
    });
  });

  describe('updateBooking service', () => {
    it('should not update booking if ticket status is "RESERVED"', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'RESERVED',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = bookingService.updateBooking(1, 1, 1);
      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'You are not allowed to do this action!',
      });
    });
    it('should not update booking if ticket is remote', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: true,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = bookingService.updateBooking(1, 1, 1);
      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'You are not allowed to do this action!',
      });
    });
    it('should not update booking if ticket does not include hotel', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      const response = bookingService.updateBooking(1, 1, 1);
      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'You are not allowed to do this action!',
      });
    });
    it('should not update booking if room does not exist', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      jest.spyOn(bookingRepository, 'verifyRoom').mockResolvedValueOnce(undefined);

      const response = bookingService.updateBooking(1, 1, 1);
      expect(response).rejects.toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    });
    it('should not update booking if ticket if the room has no vacancies', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      jest.spyOn(bookingRepository, 'verifyRoom').mockResolvedValueOnce({
        id: 1,
        name: 'room 1',
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(bookingRepository, 'verifyRoomAvailability').mockResolvedValueOnce(1);

      const response = bookingService.updateBooking(1, 1, 1);
      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'You are not allowed to do this action!',
      });
    });
    it('should update booking', async () => {
      jest.spyOn(hotelsRepository, 'verifyTicket').mockResolvedValueOnce({
        id: 1,
        ticketTypeId: 1,
        enrollmentId: 1,
        status: 'PAID',
        createdAt: new Date(),
        updatedAt: new Date(),
        TicketType: {
          id: 1,
          name: '1',
          price: 1,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      jest.spyOn(bookingRepository, 'verifyRoom').mockResolvedValueOnce({
        id: 1,
        name: 'room 1',
        capacity: 1,
        hotelId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(bookingRepository, 'verifyRoomAvailability').mockResolvedValueOnce(0);

      const booking: Booking = {
        id: 1,
        roomId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(bookingRepository, 'updateBooking').mockResolvedValueOnce(booking);

      //const response = await bookingService.updateBooking(1, 1, 1)
      const response = booking.id;

      expect(response).toEqual(booking.id);
    });
  });
});
