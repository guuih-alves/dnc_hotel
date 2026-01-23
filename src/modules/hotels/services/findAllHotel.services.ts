import { Inject, Injectable } from '@nestjs/common';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindAllHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}
  async execute(page: number = 1, limit: number = 10) {
    const offSet = (page - 1) * limit;
    const data = await this.hotelRepositories.findHotels(offSet, limit);
    const total = await this.hotelRepositories.countHotels();

    return {
      total,
      page,
      per_page: limit,
      data,
    };
  }
}
