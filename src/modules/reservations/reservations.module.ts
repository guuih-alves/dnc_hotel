import { Module } from '@nestjs/common';
import { ReservationsController } from './infra/reservations.controller';
import { CreateReservationsService } from './services/createReservations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.model';
import { UserModule } from '../users/user.module';
import { HotelsModule } from '../hotels/hotels.module';
import { REPOSITORY_TOKEN_RESERVATION } from './utils/repositoriesTokens';
import { ReservationsRepository } from './infra/reservations.repository';
import { HotelsRepositories } from '../hotels/infra/hotels.repository';
import { REPOSITORY_TOKEN_HOTEL } from '../hotels/utils/repositoriesTokens';

import { findByIdReservationService } from './services/findByIdReservation.service';
import { findByUserReservationService } from './services/findByUserReservation.service';
import { FindAllHotelService } from '../hotels/services/findAllHotel.services';
import { UpdateStatusReservationService } from './services/updateStatusReservation.service';
import { findByHotelReservationService } from './services/findByHotelReservations.service';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, HotelsModule],
  controllers: [ReservationsController],
  providers: [
    CreateReservationsService,
    FindAllHotelService,
    findByIdReservationService,
    findByUserReservationService,
    findByHotelReservationService,
    UpdateStatusReservationService,
    {
      provide: REPOSITORY_TOKEN_RESERVATION,
      useClass: ReservationsRepository,
    },
    {
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: HotelsRepositories,
    },
  ],
})
export class ReservationsModule {}
