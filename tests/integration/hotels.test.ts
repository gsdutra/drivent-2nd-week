import supertest from 'supertest';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import faker from '@faker-js/faker';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import { prisma } from '@/config';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('should respond with status 404 if there are no hotels', async () => {
    const response = await server.get('/hotels');

    expect(response.status).toBe(200);
  });
});

describe('GET /hotels/hotelId', () => {
  it('should respond with status xxx ', async () => {
    const response = await server.get('/hotels');

    expect(response.status).toBe(200);
  });
});
