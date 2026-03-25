import { Controller, Get, Post, Body, UseGuards, Patch, ParseIntPipe, Param } from '@nestjs/common';
import { CreateReservationsService } from '../services/createReservations.service';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { User } from '../../../shared/decorators/user.decorators';
import { FindAllHotelService } from '../../../modules/hotels/services/findAllHotel.services';
import { findByIdReservationService } from '../services/findByIdReservation.service';
import { findByUserReservationService } from '../services/findByUserReservation.service';
import { ParamId } from '../../../shared/decorators/paramId.decorator';
import { ReservationStatus, Role } from '@prisma/client';
import { UpdateStatusReservationService } from '../services/updateStatusReservation.service';
import { RoleGuard } from '../../../shared/guards/role.guard';
import { Roles } from '../../../shared/decorators/roles.decorators';
import { findByHotelReservationService } from '../services/findByHotelReservations.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationService: CreateReservationsService,
    private readonly findByIdReservationService: findByIdReservationService,
    private readonly findAllReservationService: FindAllHotelService,
    private readonly findByUserReservationService: findByUserReservationService,
    private readonly updateStatusReservationService: UpdateStatusReservationService,
    private readonly findByHotelReservationService: findByHotelReservationService,
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

  @Get('user')
  findByUser(@User('id') id: number) {
    return this.findByUserReservationService.execute(id);
  }

  @Get('hotel/:id')
  findByHotel(@Param('id', ParseIntPipe) id: number) {
    return this.findByHotelReservationService.execute(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.findByIdReservationService.execute(id);
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
