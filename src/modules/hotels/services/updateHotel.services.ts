import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDTO } from '../dto/update-hotel.dto.js';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories.js';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens.js';

@Injectable()
export class UpdateHotelService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}

  async execute(id: number, updateHotelDto: UpdateHotelDTO) {
    return await this.hotelRepositories.updateHotel(id, updateHotelDto);
  }
}
