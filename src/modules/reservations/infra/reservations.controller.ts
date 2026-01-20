import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReservationsService } from '../services/createReservations.service.js';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto.js';
import { AuthGuard } from '../../../shared/guards/auth.guard.js';
import { User } from '../../../shared/decorators/user.decorators.js';
import { FindAllHotelService } from '../../../modules/hotels/services/findAllHotel.services.js';
import { findByIdReservationService } from '../services/findByIdReservation.service.js';
import { findByUserReservationService } from '../services/findByUserReservation.service.js';
import { ParamId } from '../../../shared/decorators/paramId.decorator.js';

@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservationService: CreateReservationsService,
    private readonly findByIdReservationService: findByIdReservationService,
    private readonly findAllReservationService: FindAllHotelService,
    private readonly findByUserReservationService: findByUserReservationService,
  ) {}

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

  /*
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.createReservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.createReservationService.remove(+id);
  } */
}
