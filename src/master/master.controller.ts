import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('master')
@UseGuards(AuthGuard('jwt'))
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Post()
  createMaster(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.createMaster(createMasterDto);
  }

  @Get()
  getMasters() {
    return this.masterService.getMasters();
  }

  @Get(':id')
  getMaster(@Param('id') id: number) {
    return this.masterService.getMaster(+id);
  }

  @Put(':id')
  updateMaster(
    @Param('id') id: number,
    @Body() updateMasterDto: UpdateMasterDto,
  ) {
    return this.masterService.updateMaster(+id, updateMasterDto);
  }

  @Post(':id/schedule')
  addSchedule(
    @Param('id') masterId: number,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    return this.masterService.addSchedule(+masterId, createScheduleDto);
  }

  @Patch(':id/schedule')
  async updateSchedule(
    @Param('id') masterId: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.masterService.updateSchedule(masterId, updateScheduleDto);
  }

  @Delete(':id/schedule/:scheduleId')
  deleteSchedule(
    @Param('id') masterId: number,
    @Param('scheduleId') scheduleId: number,
  ) {
    return this.masterService.deleteSchedule(+masterId, +scheduleId);
  }

  @Delete(':id')
  deleteMaster(@Param('id') id: number) {
    return this.masterService.deleteMaster(+id);
  }
}
