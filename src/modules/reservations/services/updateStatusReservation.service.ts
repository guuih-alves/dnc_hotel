import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens';
import { REPOSITORY_TOKEN_HOTEL } from '../../hotels/utils/repositoriesTokens';
import * as IReservationsRepository from '../domain/repositories/Ireservations.repository';
import * as IHotelRepository from '../../hotels/domain/repositories/IHotel.repositories';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class UpdateStatusReservationService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationsRepository: IReservationsRepository.IReservationsRepository,
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository.IHotelRepository,
  ) {}

  async execute(id: number, status: ReservationStatus) {
    return await this.reservationsRepository.updateStatus(id, status);
  }
}
