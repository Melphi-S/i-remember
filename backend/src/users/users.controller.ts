import {
  Controller,
  Get,
  Body,
  Patch,
  BadRequestException,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import exceptions from '../common/constants/exceptions';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Statuses } from './types';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getOwnUser(@AuthUser() user: User): Promise<UserResponseDto> {
    if (!user) {
      throw new BadRequestException(exceptions.users.noId);
    }

    if (user.status === Statuses.PENDING) {
      throw new UnauthorizedException(exceptions.auth.notVerified);
    }

    return this.usersService.findById(user.id);
  }

  @Patch('me')
  async updateOwnUser(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Patch('forgot')
  async createResetCode(@Body() email: { email: string }) {
    return this.usersService.createResetCode(email.email);
  }
}
