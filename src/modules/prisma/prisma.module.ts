import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [PrismaService],
  controllers: [],
  exports: [],
})
export class PrismaModule {}
