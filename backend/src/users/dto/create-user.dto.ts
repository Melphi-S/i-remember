import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 15)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;
}
