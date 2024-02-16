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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await this.hashService.generateHash(
      createUserDto.password,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
    });

    return this.userRepository.save(newUser).catch((e) => {
      if (e.code == exceptions.dbCodes.notUnique) {
        throw new BadRequestException(exceptions.users.notUnique);
      }

      return e;
    });
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(exceptions.users.notFound);
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(exceptions.users.notFound);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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

    return this.userRepository.findOneBy({ id });
  }
}
