import faker from '@faker-js/faker';
import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

export async function createHotelWithRooms(): Promise<Hotel> {
  const hotel = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.name.suffix(),
    },
  });

  await prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: 9,
      hotelId: hotel.id,
    },
  });

  return hotel;
}
