/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest().user;
    if (!user) throw new Error('User not found in request');

    if (filter) {
      if (!user[filter]) {
        throw new Error(`User does not have property ${filter}`);
      }
      return user[filter];
    }

    return user;
  },
);
