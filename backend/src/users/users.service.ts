import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from '../hash/hash.service';
import exceptions from '../common/constants/exceptions';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from '../email/email.service';
import { UserResponseDto } from './dto/user-response.dto';
import { Statuses } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const password = await this.hashService.generateHash(
      createUserDto.password,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
    });

    await this.userRepository.save(newUser).catch((e) => {
      if (e.code == exceptions.dbCodes.notUnique) {
        throw new BadRequestException(exceptions.users.notUnique);
      }

      return e;
    });

    await this.emailService.sendConfirmationEmail(
      createUserDto.email,
      createUserDto.username,
      newUser.id,
    );

    return true;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(exceptions.auth.unauthorized);
    }

    return user;
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(exceptions.users.notFound);
    }

    const { password, ...rest } = user;

    return rest;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.generateHash(
        updateUserDto.password,
      );
    }

    await this.userRepository.update({ id }, updateUserDto).catch((e) => {
      if (e.code == exceptions.dbCodes.notUnique) {
        throw new BadRequestException(exceptions.users.notUnique);
      }

      return e;
    });

    return this.findById(id);
  }

  async changeStatus(id: string, status: Statuses) {
    await this.userRepository.update({ id }, { status });

    return true;
  }

  async createResetCode(email: string) {
    const resetCode = `${uuidv4()}_${new Date().toISOString()}`;

    const user = await this.findOne(email);

    if (!user) {
      throw new NotFoundException(exceptions.users.notFound);
    }

    await this.userRepository.update({ id: user.id }, { resetCode });

    await this.emailService.sendResetEmail(
      user.email,
      user.username,
      resetCode,
    );

    return true;
  }

  async resetPassword(newPassword: string, resetCode: string) {
    const user = await this.userRepository.findOneBy({ resetCode });

    const currentDate = new Date();
    const codeDate = new Date(resetCode.split('_')[1]);

    if (!user || currentDate.getTime() - codeDate.getTime() > 86400000) {
      throw new BadRequestException(exceptions.users.wrongCode);
    }

    const password = await this.hashService.generateHash(newPassword);

    await this.userRepository.update(user.id, { password, resetCode: null });

    return this.findById(user.id);
  }
}
