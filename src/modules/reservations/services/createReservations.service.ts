import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto.js';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens.js';
import * as IReservationsRepository from '../domain/repositories/Ireservations.repository.js';
import * as IHotelRepository from '../../../modules/hotels/domain/repositories/IHotel.repositories.js';
import { differenceInDays, parseISO } from 'date-fns';
import { ReservationStatus } from '@prisma/client';
import { REPOSITORY_TOKEN_HOTEL } from '../../../modules/hotels/utils/repositoriesTokens.js';

@Injectable()
export class CreateReservationsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationsRepository: IReservationsRepository.IReservationsRepository,
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository.IHotelRepository,
  ) {}

  async create(id: number, data: CreateReservationDto) {
    const checkInDate = parseISO(data.checkIn);
    const checkOutDate = parseISO(data.checkOut);
    const daysOfStay = differenceInDays(checkOutDate, checkInDate);

    if (checkInDate >= checkOutDate) {
      throw new BadRequestException(
        'Check-out date must be after check-in date.',
      );
    }

    const hotel = await this.hotelsRepository.findHotelById(data.hotelId);

    if (!hotel) {
      throw new BadRequestException('Hotel not found.');
    }

    if (typeof hotel.price !== 'number' || hotel.price <= 0) {
      throw new BadRequestException('Invalid hotel price.');
    }

    const total = daysOfStay * hotel.price;

    const newReservation = {
      ...data,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      total,
      userId: id,
      status: ReservationStatus.PENDING,
      hotelId: data.hotelId,
    };

    return this.reservationsRepository.create(newReservation);
  }
}
