import faker from '@faker-js/faker';
import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

export async function createRoom(hotelId: number): Promise<Room> {
  return await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 1,
      hotelId,
    },
  });
}
