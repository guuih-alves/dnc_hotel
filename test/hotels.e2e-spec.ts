import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Role } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { CreateHotelDTO } from 'src/modules/hotels/dto/create-hotel.dto';
import { UpdateHotelDTO } from 'src/modules/hotels/dto/update-hotel.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let adminToken: string;
  let userToken: string;
  let hotelId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'hashed-password',
        role: 'ADMIN',
      },
    });

    const normalUser = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        name: 'Normal User',
        email: 'user@example.com',
        password: 'user',
        role: Role.USER,
      },
    });

    await prisma.hotel.create({
      data: {
        name: 'Hotel Test',
        description: 'Test hotel',
        address: 'Test street',
        price: 100,
        ownerId: adminUser.id,
        status: 'APPROVED',
      },
    });

    adminToken = jwt.sign(
      { sub: adminUser.id, role: Role.ADMIN },
      process.env.JWT_SECRET!,
      { expiresIn: '1h', issuer: 'dnc_hotel', audience: 'users' },
    );

    userToken = jwt.sign(
      { sub: normalUser.id, role: Role.USER },
      process.env.JWT_SECRET!,
      { expiresIn: '1h', issuer: 'dnc_hotel', audience: 'users' },
    );
  });

  afterAll(async () => {
    await prisma.reservation.deleteMany();
    await prisma.hotel.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
  });

  it('/hotels/ (POST', async () => {
    const createHotelDto: CreateHotelDTO = {
      name: 'Hotel Test',
      description: 'A new hotel',
      price: 150,
      address: '123 New St',
      ownerId: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/hotels')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(createHotelDto)
      .expect(201);

    hotelId = response.body.id;

    expect(response.body).toMatchObject({
      name: createHotelDto.name,
      description: createHotelDto.description,
      address: createHotelDto.address,
      price: createHotelDto.price,
    });
  });

  it('/hotels (GET', async () => {
    const response = await request(app.getHttpServer())
      .get('/hotels')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it('/hotels/:id (GET', async () => {
    const response = await request(app.getHttpServer())
      .get(`/hotels/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: hotelId,
      name: 'Hotel Test',
    });
  });

  it('/hotels/:id (PATCH)', async () => {
    const updateHotelDto: UpdateHotelDTO = {
      name: 'Updated hotel',
    };

    const response = await request(app.getHttpServer())
      .patch(`/hotels/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(updateHotelDto)
      .expect(200);

    expect(response.body).toMatchObject({
      name: updateHotelDto.name,
    });
  });

  it('/hotels/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/hotels/${hotelId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });
});
