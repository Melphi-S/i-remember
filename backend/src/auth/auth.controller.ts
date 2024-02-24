import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { SigninResponseDto } from './dto/signin-response.dtp';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { ResetDto } from './dto/reset.dto';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@AuthUser() user: UserResponseDto): SigninResponseDto {
    return this.authService.auth(user);
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return true;
  }

  @Get('verify/:id')
  async verifyByEmailCode(@Param('id') id: string) {
    return this.authService.verifyEmail(id);
  }

  @Patch('reset')
  async resetPassword(@Body() resetDto: ResetDto) {
    return this.authService.resetPassword(resetDto);
  }
}
