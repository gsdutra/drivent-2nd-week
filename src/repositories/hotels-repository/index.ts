import { PrismaClient } from '@prisma/client';
import { prisma } from '@/config';

export async function getAll() {
  return 0;
}

export async function getById(id: number) {
  return id;
}
