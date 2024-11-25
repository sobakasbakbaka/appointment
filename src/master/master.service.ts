import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) {}

  async createMaster(dto: CreateMasterDto) {
    return this.prisma.master.create({
      data: {
        name: dto.name,
      },
    });
  }

  async getMasters() {
    return this.prisma.master.findMany({
      include: { schedules: true },
    });
  }

  async getMaster(id: number) {
    return this.prisma.master.findUnique({
      where: { id },
      include: { schedules: true },
    });
  }

  async updateMaster(id: number, dto: UpdateMasterDto) {
    return this.prisma.master.update({
      where: { id },
      data: dto,
    });
  }

  async addSchedule(masterId: number, createScheduleDto: CreateScheduleDto) {
    const master = await this.prisma.master.findUnique({
      where: { id: masterId },
    });

    if (!master) {
      throw new NotFoundException(`Master with ID ${masterId} not found`);
    }

    const overlappingSchedule = await this.prisma.schedule.findFirst({
      where: {
        masterId,
        OR: [
          {
            workStartTime: { lt: new Date(createScheduleDto.workEndTime) },
            workEndTime: { gt: new Date(createScheduleDto.workStartTime) },
          },
        ],
      },
    });

    if (overlappingSchedule) {
      throw new ConflictException(
        `Schedule conflict: The master already has a schedule during this time.`,
      );
    }

    return this.prisma.schedule.create({
      data: {
        masterId,
        workStartTime: new Date(createScheduleDto.workStartTime),
        workEndTime: new Date(createScheduleDto.workEndTime),
      },
    });
  }

  async updateSchedule(masterId: number, dto: UpdateScheduleDto) {
    const { workEndTime, workStartTime, scheduleId } = dto;

    if (scheduleId) {
      return this.prisma.schedule.update({
        where: { id: scheduleId },
        data: {
          workStartTime: new Date(workStartTime),
          workEndTime: new Date(workEndTime),
        },
      });
    }

    return this.prisma.schedule.create({
      data: {
        masterId,
        workStartTime: new Date(workStartTime),
        workEndTime: new Date(workEndTime),
      },
    });
  }

  async deleteSchedule(masterId: number, scheduleId: number) {
    const master = await this.prisma.master.findUnique({
      where: { id: masterId },
    });

    if (!master) {
      throw new NotFoundException(`Master with ID ${masterId} not found`);
    }

    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId, masterId },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${scheduleId} not found`);
    }

    return this.prisma.schedule.delete({
      where: { id: scheduleId },
    });
  }

  async deleteMaster(id: number) {
    return this.prisma.master.delete({
      where: { id },
    });
  }
}
