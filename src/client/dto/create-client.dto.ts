import {
  IsDateString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsDateString()
  birthday: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  telegram?: string;
}
