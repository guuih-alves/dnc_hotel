import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service.js';
import { FindOneHotelService } from '../../modules/hotels/services/findOneHotel.service.js';

@Injectable()
export class OwnerHotelGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly hotelService: FindOneHotelService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const holelId = request.params.id;

    const user = request.user;

    if (!user) return false;

    const hotel = await this.hotelService.execute(holelId);

    if (!hotel) return false;

    return hotel.ownerId === user.id;
  }
}
