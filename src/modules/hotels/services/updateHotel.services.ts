import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDTO } from '../dto/update-hotel.dto.js';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories.js';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens.js';

@Injectable()
export class UpdateHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}

  async execute(id: number, updateHotelDto: UpdateHotelDTO) {
    return await this.hotelRepositories.updateHotel(id, updateHotelDto);
  }
}
