import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateScheduleDto {
  @IsDateString()
  workStartTime: string;

  @IsDateString()
  workEndTime: string;

  @IsOptional()
  @IsNumber()
  scheduleId?: number; // ID существующего расписания для обновления
}
