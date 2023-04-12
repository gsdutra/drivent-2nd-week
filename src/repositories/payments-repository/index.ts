import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findFirst(id: number) {
  return prisma.payment.findFirst({
    where: {
      id,
    },
  });
}

async function createPayment(payment: Prisma.PaymentCreateInput) {
  return prisma.payment.create({
    data: payment,
  });
}
