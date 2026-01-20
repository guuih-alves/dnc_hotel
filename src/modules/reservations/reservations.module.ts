import { Module } from '@nestjs/common';
import { ReservationsController } from './infra/reservations.controller.js';
import { CreateReservationsService } from './services/createReservations.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.model.js';
import { UserModule } from '../users/user.module.js';
import { HotelsModule } from '../hotels/hotels.module.js';
import { REPOSITORY_TOKEN_RESERVATION } from './utils/repositoriesTokens.js';
import { ReservationsRepository } from './infra/reservations.repository.js';
import { HotelsRepositories } from '../hotels/infra/hotels.repository.js';
import { REPOSITORY_TOKEN_HOTEL } from '../hotels/utils/repositoriesTokens.js';

import { findByIdReservationService } from './services/findByIdReservation.service.js';
import { findByUserReservationService } from './services/findByUserReservation.service.js';
import { FindAllHotelService } from '../hotels/services/findAllHotel.services.js';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, HotelsModule],
  controllers: [ReservationsController],
  providers: [
    CreateReservationsService,
    FindAllHotelService,
    findByIdReservationService,
    findByUserReservationService,
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
