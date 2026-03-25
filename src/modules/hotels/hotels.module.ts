import { Module } from '@nestjs/common';
import { FindAllHotelService } from './services/findAllHotel.services';
import { FindOneHotelService } from './services/findOneHotel.service';
import { UpdateHotelService } from './services/updateHotel.services';
import { RemoveHotelService } from './services/removeHotel.services';
import { CreateHotelsService } from './services/createHotel.services';
import { HotelsRepositories } from './infra/hotels.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { HotelsController } from './infra/hotels.controller';
import { REPOSITORY_TOKEN_HOTEL } from './utils/repositoriesTokens';
import { FindByOwnerHotelService } from './services/findByOwner.services';
import { AuthModule } from '../auth/auth.model';
import { FindByNameHotelService } from './services/FindByName.services';
import { UserModule } from '../users/user.module';

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
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: HotelsRepositories,
    },
  ],
})
export class HotelsModule {}
