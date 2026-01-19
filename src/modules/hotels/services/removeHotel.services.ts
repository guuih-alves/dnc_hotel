import { Inject, Injectable } from '@nestjs/common';
import { HOTEL_REPOSITORY_TOKEN } from '../utils/repositoriesTokens.js';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories.js';

@Injectable()
export class RemoveHotelService {
  constructor(
    @Inject(HOTEL_REPOSITORY_TOKEN)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}
  execute(id: number) {
    return this.hotelRepositories.deleteHotel(id);
  }
}
