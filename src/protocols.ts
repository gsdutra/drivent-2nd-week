export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type Ticket = {
  id?: number;
  ticketTypeId: number;
  enrollmentId: number;
  status: any;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Payment = {
  id?: number;
  ticketId: number;
  value: number;
  cardIssuer: string;
  cardLastDigits: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TicketType = {
  id: number;
  name: string;
  price: number;
  isRemote: boolean;
  includesHotel: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
