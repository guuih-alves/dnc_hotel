import { Module } from '@nestjs/common';
import { FindAllHotelService } from './services/findAllHotel.services.js';
import { FindOneHotelService } from './services/findOneHotel.service.js';
import { UpdateHotelService } from './services/updateHotel.services.js';
import { RemoveHotelService } from './services/removeHotel.services.js';
import { CreateHotelsService } from './services/createHotel.services.js';
import { HotelsRepositories } from './infra/hotels.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { HotelsController } from './infra/hotels.controller.js';
import { HOTEL_REPOSITORY_TOKEN } from './utils/repositoriesTokens.js';
import { FindByOwnerHotelService } from './services/findByOwner.services.js';
import { AuthModule } from '../auth/auth.model.js';
import { FindByNameHotelService } from './services/FindByName.services.js';
import { UserModule } from '../users/user.module.js';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindAllHotelService,
    FindOneHotelService,
    UpdateHotelService,
    RemoveHotelService,
    FindByOwnerHotelService,
    FindByNameHotelService,
    {
      provide: HOTEL_REPOSITORY_TOKEN,
      useClass: HotelsRepositories,
    },
  ],
})
export class HotelsModule {}
