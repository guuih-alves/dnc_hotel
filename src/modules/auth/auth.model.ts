import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';

import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthController } from './domain/auth.controller.js';
import { UserModule } from '../users/user.module.js';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PrismaModule,
    UserModule,
  ],

  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
