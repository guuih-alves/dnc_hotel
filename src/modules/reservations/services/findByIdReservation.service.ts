import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens';
import { REPOSITORY_TOKEN_HOTEL } from '../../../modules/hotels/utils/repositoriesTokens';
import * as IReservationsRepository from '../domain/repositories/Ireservations.repository';
import * as IHotelRepository from '../../../modules/hotels/domain/repositories/IHotel.repositories';

@Injectable()
export class findByIdReservationService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationsRepository: IReservationsRepository.IReservationsRepository,
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository.IHotelRepository,
  ) {}

  async execute(id: number) {
    return await this.reservationsRepository.findById(id);
  }
}
