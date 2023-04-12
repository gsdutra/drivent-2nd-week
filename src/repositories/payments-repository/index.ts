import { PrismaClient, Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findFirst(id: number) {
  return prisma.payment.findFirst({
    where: {
      id,
    },
  });
}

async function createPayment(payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.payment.create({
    data: payment,
  });
}

const paymentsRepository = {
  findFirst,
  createPayment,
};

export default paymentsRepository;
