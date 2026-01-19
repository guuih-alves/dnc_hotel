import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDTO } from '../dto/create-hotel.dto.js';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories.js';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens.js';

@Injectable()
export class CreateHotelsService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}
  async execute(createHotelDto: CreateHotelDTO, id: number) {
    return await this.hotelRepositories.createHotel(createHotelDto, id);
  }
}
