import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ✅ NestJS export (this is OK)
})
export class PrismaModule {}
