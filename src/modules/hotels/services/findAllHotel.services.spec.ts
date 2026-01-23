import { IHotelRepository } from '../domain/repositories/IHotel.repositories';
import { FindAllHotelService } from './findAllHotel.services';
import { Test, TestingModule } from '@nestjs/testing';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { find } from 'rxjs';
import { Hotel } from '@prisma/client';

let service: FindAllHotelService;
let hotelRepository: IHotelRepository;

const HotelMock = {
  id: 1,
  name: 'Hotel Test',
  description: 'Description Test',
  price: 100,
  address: 'Address Test',
  ownerId: 1,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-11T00:00:00Z'),
};

describe('FindAllHotelService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllHotelService,
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          provide: REPOSITORY_TOKEN_HOTEL,
          useValue: {
            findHotels: jest.fn(),
            countHotels: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindAllHotelService>(FindAllHotelService);
    hotelRepository = module.get<IHotelRepository>(REPOSITORY_TOKEN_HOTEL);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return hotels', async () => {
    const result = await service.execute(1, 10);
    expect(hotelRepository.findHotels).toHaveBeenCalledWith(0, 10);
    expect(hotelRepository.countHotels).toHaveBeenCalled();
    expect(result).toEqual({
      total: undefined,
      page: 1,
      per_page: 10,
      data: undefined,
    });
  });
});

//imagens nao foram utilizadas
