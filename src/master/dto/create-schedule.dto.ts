import { IsDateString } from 'class-validator';

export class CreateScheduleDto {
  @IsDateString()
  workStartTime: string;

  @IsDateString()
  workEndTime: string;
}
