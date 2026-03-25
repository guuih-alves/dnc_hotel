import { Inject, Injectable } from '@nestjs/common';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindByNameHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}
  async execute(name: string) {
    return await this.hotelRepositories.findHotelByName(name);
  }
}
