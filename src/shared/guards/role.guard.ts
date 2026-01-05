import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES_KEY } from '../decorators/roles.decorators.js';
import { Role } from '@prisma/client';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const requeridRules = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRules) return true;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const isRoleMatch = requeridRules.some((role) => user.role === role);
    return isRoleMatch;
  }
}
