import { IsString } from 'class-validator';

export class UpdateMasterDto {
  @IsString()
  name: string;
}
