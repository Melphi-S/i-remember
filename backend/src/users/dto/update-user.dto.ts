import { IsOptional, IsString, IsUrl, Length, Max, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 15)
  @IsOptional()
  username: string;

  @IsString()
  @Min(8)
  @IsOptional()
  password: string;

  @IsUrl()
  @IsOptional()
  avatar: string;

  @Min(1)
  @Max(5)
  @IsOptional()
  wordPerDay: number;
}
