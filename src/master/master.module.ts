import { Module } from '@nestjs/common';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MasterController],
  providers: [MasterService, PrismaService],
  exports: [MasterService],
})
export class MasterModule {}
