import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDTO } from '../dto/create-hotel.dto';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

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
