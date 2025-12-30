import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { UserModule } from './modules/users/user.module.js';
import { AuthModule } from './modules/auth/auth.model.js';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
})
export class AppModule {}
