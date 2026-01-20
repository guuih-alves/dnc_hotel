import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens.js';
import { REPOSITORY_TOKEN_HOTEL } from '../../../modules/hotels/utils/repositoriesTokens.js';
import * as IReservationsRepository from '../domain/repositories/Ireservations.repository.js';
import * as IHotelRepository from '../../../modules/hotels/domain/repositories/IHotel.repositories.js';

@Injectable()
export class findAllReservationService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationsRepository: IReservationsRepository.IReservationsRepository,
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository.IHotelRepository,
  ) {}

  async execute() {
    return await this.reservationsRepository.findAll();
  }
}
