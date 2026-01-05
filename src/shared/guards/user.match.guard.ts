/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserMatchGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    const user = request.user;

    if (user.id !== Number(id)) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource.',
      );
    }
    return true;
  }
}
