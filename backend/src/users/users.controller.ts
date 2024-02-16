import {
  Controller,
  Get,
  Body,
  Patch,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import exceptions from '../common/constants/exceptions';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getOwnUser(@AuthUser() user: User): Promise<UserResponseDto> {
    if (!user) {
      throw new BadRequestException(exceptions.users.noId);
    }

    return this.usersService.findById(user.id);
  }

  @Patch('me')
  async updateOwnUser(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(user.id, updateUserDto);
  }
}
