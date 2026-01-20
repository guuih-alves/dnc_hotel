import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDTO } from '../dto/create-hotel.dto.js';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories.js';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens.js';

@Injectable()
export class CreateHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}
  async execute(createHotelDto: CreateHotelDTO, id: number) {
    return await this.hotelRepositories.createHotel(createHotelDto, id);
  }
}
