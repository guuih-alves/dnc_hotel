import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './domain/auth.controller';
import { UserModule } from '../users/user.module';
import { AuthGuard } from '../../shared/guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    PrismaModule,
    forwardRef(() => UserModule),
  ],

  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
