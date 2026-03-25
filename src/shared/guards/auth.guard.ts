/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { UserService } from '../../modules/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) return false;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token = authorization.split(' ')[1];

    const { valid, decoded } = await this.authService.validateToken(token);

    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');

    const user = await this.userService.show(Number(decoded.sub));

    if (!user) return false;

    request.user = user;

    return true;
  }
}
