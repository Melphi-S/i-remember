import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateWordDto {
  @IsString()
  en: string;

  @IsString()
  ru: string;

  @IsString()
  tr: string;

  @IsUrl()
  @IsOptional()
  voice: string;
}
