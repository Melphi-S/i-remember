import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from '../hash/hash.service';
import exceptions from '../common/constants/exceptions';
import { Statuses } from '../users/types';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { ResetDto } from './dto/reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  auth(user: UserResponseDto) {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException(exceptions.auth.unauthorized);
    }

    const isAuthorized = await this.hashService.compareHash(
      password,
      user.password,
    );

    if (!isAuthorized) {
      throw new UnauthorizedException(exceptions.auth.unauthorized);
    }

    if (user.status === Statuses.PENDING) {
      throw new UnauthorizedException(exceptions.auth.notVerified);
    }

    return isAuthorized ? user : null;
  }

  async verifyEmail(id: string) {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new UnauthorizedException(exceptions.auth.unauthorized);
    }

    if (user.status === Statuses.ACTIVE) {
      throw new BadRequestException(exceptions.auth.alreadyVerified);
    }

    await this.usersService.changeStatus(id, Statuses.ACTIVE);

    return this.auth(user);
  }

  async resetPassword(resetDto: ResetDto) {
    const user = await this.usersService.resetPassword(
      resetDto.password,
      resetDto.code,
    );

    return this.auth(user);
  }
}
