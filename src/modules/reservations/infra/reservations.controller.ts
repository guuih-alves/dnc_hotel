import { Controller, Get, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { CreateReservationsService } from '../services/createReservations.service.js';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto.js';
import { AuthGuard } from '../../../shared/guards/auth.guard.js';
import { User } from '../../../shared/decorators/user.decorators.js';
import { FindAllHotelService } from '../../../modules/hotels/services/findAllHotel.services.js';
import { findByIdReservationService } from '../services/findByIdReservation.service.js';
import { findByUserReservationService } from '../services/findByUserReservation.service.js';
import { ParamId } from '../../../shared/decorators/paramId.decorator.js';
import { ReservationStatus, Role } from '@prisma/client';
import { UpdateStatusReservationService } from '../services/updateStatusReservation.service.js';
import { RoleGuard } from '../../../shared/guards/role.guard.js';
import { Roles } from '../../../shared/decorators/roles.decorators.js';

@UseGuards(AuthGuard, RoleGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationService: CreateReservationsService,
    private readonly findByIdReservationService: findByIdReservationService,
    private readonly findAllReservationService: FindAllHotelService,
    private readonly findByUserReservationService: findByUserReservationService,
    private readonly updateStatusReservationService: UpdateStatusReservationService,
  ) {}

  @Roles(Role.USER, Role.ADMIN)
  @Post()
  create(@User('id') id: number, @Body() body: CreateReservationDto) {
    return this.createReservationService.create(id, body);
  }

  @Get()
  findAll() {
    return this.findAllReservationService.execute();
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findByIdReservationService.execute(+id);
  }

  @Get('user')
  findByUser(@User('id') id: number) {
    return this.findByUserReservationService.execute(+id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  updateStatus(
    @ParamId() id: number,
    @Body('status') status: ReservationStatus,
  ) {
    return this.updateStatusReservationService.execute(id, status);
  }
}
