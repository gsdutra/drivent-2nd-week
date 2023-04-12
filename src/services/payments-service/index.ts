import paymentsRepository from '@/repositories/payments-repository';
import { invalidDataError, notFoundError } from '@/errors';
import { Payment } from '@/protocols';

async function findFirst(id: number) {
  if (!id) throw invalidDataError(['id is required']);
  const payment = paymentsRepository.findFirst(id);
  if (!payment) throw notFoundError();
  return payment;
}

async function createPayment(payment: Payment) {
  if (!payment) throw invalidDataError(['payment is required']);
  const paymentResult = paymentsRepository.createPayment(payment);
  if (!paymentResult) throw notFoundError();
  return paymentResult;
}
