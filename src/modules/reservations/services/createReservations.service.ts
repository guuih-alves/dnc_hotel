import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens';
import * as IReservationsRepository from '../domain/repositories/Ireservations.repository';
import * as IHotelRepository from '../../../modules/hotels/domain/repositories/IHotel.repositories';
import { differenceInDays, parseISO } from 'date-fns';
import { ReservationStatus } from '@prisma/client';
import { REPOSITORY_TOKEN_HOTEL } from '../../../modules/hotels/utils/repositoriesTokens';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from '../../../modules/users/user.service';

@Injectable()
export class CreateReservationsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationsRepository: IReservationsRepository.IReservationsRepository,
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository.IHotelRepository,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async create(id: number, data: CreateReservationDto) {
    const checkInDate = parseISO(data.checkIn);
    const checkOutDate = parseISO(data.checkOut);
    const daysOfStay = differenceInDays(checkInDate, checkOutDate);

    if (checkInDate >= checkOutDate) {
      throw new BadRequestException(
        'Check-out date must be after check-in date.',
      );
    }

    const hotel = await this.hotelsRepository.findHotelById(data.hotelId);

    if (!hotel) {
      throw new BadRequestException('Hotel not found.');
    }

    if (typeof hotel.price !== 'number' || hotel.price <= 0) {
      throw new BadRequestException('Invalid hotel price.');
    }

    const total = daysOfStay * hotel.price;

    const newReservation = {
      ...data,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      total,
      userId: id,
      status: ReservationStatus.PENDING,
      hotelId: data.hotelId,
    };

    const hotelOwner = await this.userService.show(hotel.ownerId);

    await this.mailerService.sendMail({
      to: hotelOwner.email,
      subject: 'Pending Reservation Notification',
      html: `<p>A new reservation has been made for your hotel: ${hotel.name}.</p>
             <p>Check-in Date: ${newReservation.checkIn}</p>
             <p>Check-out Date: ${newReservation.checkOut}</p>
             <p>Total Amount: $${newReservation.total}</p>`,
    });

    return this.reservationsRepository.create(newReservation);
  }
}
