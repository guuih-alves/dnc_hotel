import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDTO } from '../dto/update-hotel.dto';
import * as IHotelRepositories from '../domain/repositories/IHotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class UpdateHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelRepositories: IHotelRepositories.IHotelRepository,
  ) {}

  async execute(id: number, updateHotelDto: UpdateHotelDTO) {
    return await this.hotelRepositories.updateHotel(id, updateHotelDto);
  }
}
