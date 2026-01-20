import { Inject, Injectable } from '@nestjs/common';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories.js';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens.js';

@Injectable()
export class FindByOwnerHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}
  async execute(id: number) {
    return await this.hotelRepositories.findHotelByOwner(Number(id));
  }
}
