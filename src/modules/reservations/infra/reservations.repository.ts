import { Injectable } from '@nestjs/common';
import { IReservationsRepository } from '../domain/repositories/Ireservations.repository.js';
import { Reservation, ReservationStatus } from '@prisma/client';
import { PrismaService } from '../../../modules/prisma/prisma.service.js';

@Injectable()
export class ReservationsRepository implements IReservationsRepository {
  constructor(private readonly prisma: PrismaService) {} // Assuming PrismaClient is properly imported and injected

  create(data: any): Promise<Reservation> {
    return this.prisma.reservation.create({ data });
    // Implementation of repository methods will go here
  }

  findById(id: number): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({ where: { id } });
  }
  findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  findByUser(userId: number): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({ where: { userId } });
  }

  updateStatus(id: number, status: ReservationStatus): Promise<Reservation> {
    return this.prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}
