import { IsOptional, IsString, IsUrl, Length, Max, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 15)
  @IsOptional()
  username: string;

  @IsUrl()
  @IsOptional()
  avatar: string;

  @Min(1)
  @Max(5)
  @IsOptional()
  wordsPerDay: number;
}
