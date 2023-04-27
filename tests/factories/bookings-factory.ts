import faker from '@faker-js/faker';
import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

export async function createRoom(hotelId: number, capacity: number): Promise<Room> {
  return await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity,
      hotelId,
    },
  });
}

export async function createBooking(userId: number, roomId: number) {
  return await prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
