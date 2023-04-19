import { ApplicationError } from '@/protocols';

export function paymentRequiredError(): ApplicationError {
  return {
    name: 'PaymentRequiredError',
    message: 'The ticket is not paid yet, is remote or does not include hotel.',
  };
}
