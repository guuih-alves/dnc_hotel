import { Test, TestingModule } from '@nestjs/testing';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { CreateHotelsService } from './createHotel.services';
import { IHotelRepository } from '../domain/repositories/IHotel.repositories';

let service: CreateHotelsService;
let hotelRepository: IHotelRepository;

const createHotelMock = {
  id: 1,
  name: 'Hotel Test',
  description: 'Description Test',
  price: 100,
  address: 'Address Test',
  ownerId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const userIdMock = 1;

describe('CreateHotelsService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHotelsService,
        {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          provide: REPOSITORY_TOKEN_HOTEL,
          useValue: {
            createHotel: jest.fn().mockResolvedValue(createHotelMock),
          },
        },
      ],
    }).compile();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
    service = module.get<CreateHotelsService>(CreateHotelsService);
    hotelRepository = module.get<IHotelRepository>(REPOSITORY_TOKEN_HOTEL);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a hotel', async () => {
    const result = await service.execute(createHotelMock, userIdMock);
    expect(hotelRepository.createHotel).toHaveBeenCalledWith(
      createHotelMock,
      userIdMock,
    );

    expect(result).toEqual(createHotelMock);
  });
});
