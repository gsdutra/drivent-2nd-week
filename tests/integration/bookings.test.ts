import httpStatus from 'http-status';
import supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import { createEvent } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import * as factory from '../factories';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /booking', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/booking');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await factory.createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 404 if user does not have a booking', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);

      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should return status 200 with booking data on success', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const hotel = await factory.createHotelWithRooms();
      const room = await factory.createRoom(hotel.id, 1);

      await factory.createBooking(user.id, room.id);

      const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        Room: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          capacity: expect.any(Number),
          hotelId: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      });
    });
  });
});

describe('POST /booking', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/booking');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await factory.createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 403 if ticket is remote', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(true, true);
      const hotel = await factory.createHotelWithRooms();
      const room = await factory.createRoom(hotel.id, 1);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should return status 403 if ticket does not include hotel', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(false, false);
      const hotel = await factory.createHotelWithRooms();
      const room = await factory.createRoom(hotel.id, 1);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should return status 403 if ticket has not been paid yet', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(false, true);
      const hotel = await factory.createHotelWithRooms();
      const room = await factory.createRoom(hotel.id, 1);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should return status 403 if the room has no vacancies', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(false, true);
      const hotel = await factory.createHotelWithRooms();
      const room = await factory.createRoom(hotel.id, 0);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should return status 404 if the room does not exist', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(false, true);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: 0,
      });

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should return status 200 with booking ID on success', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(false, true);
      const hotel = await factory.createHotelWithRooms();
      const room = await factory.createRoom(hotel.id, 1);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });

      expect(response.status).toBe(httpStatus.OK);

      expect(response.body).toEqual(
        expect.objectContaining({
          bookingId: expect.any(Number),
        }),
      );
    });
  });
});

describe('PUT /booking', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/booking');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await factory.createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('When token is valid', () => {
    it('should return status 403 if user does not have a booking', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const hotel = await factory.createHotelWithRooms();
      const room = await factory.createRoom(hotel.id, 1);

      const response = await server.put('/booking/0').set('Authorization', `Bearer ${token}`).send({
        roomId: room.id,
      });

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should return status 403 if the new room has no vacancies', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(false, true);
      const hotel = await factory.createHotelWithRooms();
      const roomOld = await factory.createRoom(hotel.id, 2);
      const roomNew = await factory.createRoom(hotel.id, 0);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const booking = await factory.createBooking(user.id, roomOld.id);

      const response = await server
        .put('/booking/' + String(booking.id))
        .set('Authorization', `Bearer ${token}`)
        .send({
          roomId: roomNew.id,
        });

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should return status 404 if the room does not exist', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(false, true);
      const hotel = await factory.createHotelWithRooms();
      const roomOld = await factory.createRoom(hotel.id, 2);
      const roomNew = await factory.createRoom(hotel.id, 0);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      await factory.createBooking(user.id, roomOld.id);

      const response = await server.put('/booking/0').set('Authorization', `Bearer ${token}`).send({
        roomId: roomNew.id,
      });

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should return status 200 with booking ID on success', async () => {
      const user = await factory.createUser();
      const token = await generateValidToken(user);
      const enrollment = await factory.createEnrollmentWithAddress(user);
      const ticketType = await factory.createSpecificTicketType(false, true);
      const hotel = await factory.createHotelWithRooms();
      const roomOld = await factory.createRoom(hotel.id, 2);
      const roomNew = await factory.createRoom(hotel.id, 1);

      await factory.createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const booking = await factory.createBooking(user.id, roomOld.id);

      const response = await server
        .put('/booking/' + String(booking.id))
        .set('Authorization', `Bearer ${token}`)
        .send({
          roomId: roomNew.id,
        });

      expect(response.status).toBe(httpStatus.OK);

      expect(response.body).toEqual(
        expect.objectContaining({
          bookingId: expect.any(Number),
        }),
      );
    });
  });
});
