import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ✅ NestJS export (this is OK)
})
export class PrismaModule {}
