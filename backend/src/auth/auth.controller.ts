import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { SigninResponseDto } from './dto/signin-response.dtp';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@AuthUser() user: User): SigninResponseDto {
    return this.authService.auth(user);
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.auth(user);
  }
}
