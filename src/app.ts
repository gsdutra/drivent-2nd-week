import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';

import * as routers from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', routers.usersRouter)
  .use('/auth', routers.authenticationRouter)
  .use('/event', routers.eventsRouter)
  .use('/enrollments', routers.enrollmentsRouter)
  .use('/tickets', routers.ticketsRouter)
  .use('/payments', routers.paymentsRouter)
  .use('/hotels', routers.hotelsRouter)
  .use('/booking', routers.bookingsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
