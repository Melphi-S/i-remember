import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vocabulary } from './entities/vocabulary.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import exceptions from '../common/constants/exceptions';

@Injectable()
export class VocabulariesService {
  constructor(
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>,
    private readonly userService: UsersService,
  ) {}
  async create(userId: string) {
    try {
      const user = await this.userService.findById(userId);

      if (!user) {
        throw new NotFoundException(exceptions.users.notFound);
      }

      if (user.vocabulary) {
        throw new BadRequestException(exceptions.vocabularies.alreadyCreated);
      }

      const newVocabulary = this.vocabularyRepository.create({
        user,
      });

      await this.vocabularyRepository.save(newVocabulary);

      return true;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id: number): Promise<Vocabulary> {
    const vocabulary = await this.vocabularyRepository.findOne({
      where: { id },
    });

    if (!vocabulary) {
      throw new NotFoundException(exceptions.vocabularies.notFound);
    }

    return vocabulary;
  }
}
