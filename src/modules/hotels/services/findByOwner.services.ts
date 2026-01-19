import { Inject, Injectable } from '@nestjs/common';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories.js';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens.js';

@Injectable()
export class FindByOwnerHotelService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}
  async execute(id: number) {
    return await this.hotelRepositories.findHotelByOwner(Number(id));
  }
}
