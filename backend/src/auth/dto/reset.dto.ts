import { IsString } from 'class-validator';

export class ResetDto {
  @IsString()
  password: string;

  @IsString()
  code: string;
}
