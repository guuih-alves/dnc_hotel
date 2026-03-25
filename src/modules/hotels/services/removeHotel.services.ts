import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories';

@Injectable()
export class RemoveHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}
  execute(id: number) {
    return this.hotelRepositories.deleteHotel(id);
  }
}
