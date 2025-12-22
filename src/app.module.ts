import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { UserModule } from './modules/users/user.module.js';

@Module({
  imports: [PrismaModule, UserModule],
})
export class AppModule {}
