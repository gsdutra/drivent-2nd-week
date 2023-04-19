import { PrismaClient } from '@prisma/client';
import { prisma } from '@/config';

export async function getAll() {
  return prisma.hotel.findMany({});
}

export async function getById(id: number) {
  return prisma.hotel.findFirst({
    where: {
      id,
    },
    include: {
      Rooms: true,
    },
  });
}
