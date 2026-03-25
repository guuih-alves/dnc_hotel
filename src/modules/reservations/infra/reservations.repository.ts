import { Injectable } from '@nestjs/common';
import { IReservationsRepository } from '../domain/repositories/Ireservations.repository';
import { Reservation, ReservationStatus } from '@prisma/client';
import { PrismaService } from '../../../modules/prisma/prisma.service';

@Injectable()
export class ReservationsRepository implements IReservationsRepository {
  constructor(private readonly prisma: PrismaService) {} // Assuming PrismaClient is properly imported and injected

  create(data: any): Promise<Reservation> {
    return this.prisma.reservation.create({ data });
    // Implementation of repository methods will go here
  }

  findById(id: number): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  findByUser(userId: number): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
      include: {
        user: true,
        hotel: true,
      },
    });
  }

  findByHotel(hotelId: number): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: { hotelId },
      orderBy: { id: 'desc' },
      include: {
        user: true,
      },
    });
  }

  updateStatus(id: number, status: ReservationStatus): Promise<Reservation> {
    return this.prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}
