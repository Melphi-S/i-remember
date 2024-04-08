import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVocabularyWordDto } from './dto/create-vocabulary-word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VocabularyWord } from './entities/vocabulary-word.entity';
import { UsersService } from '../users/users.service';
import { WordsService } from '../words/words.service';
import exceptions from '../common/constants/exceptions';
import { VocabularyWordsStatuses } from './types';

@Injectable()
export class VocabularyWordsService {
  constructor(
    @InjectRepository(VocabularyWord)
    private readonly vocabularyWordRepository: Repository<VocabularyWord>,
    private readonly usersService: UsersService,
    private readonly wordsService: WordsService,
  ) {}
  async create(createVocabularyWordDto: CreateVocabularyWordDto) {
    try {
      const user = await this.usersService.findById(
        createVocabularyWordDto.userId,
      );

      const word = await this.wordsService.findById(
        createVocabularyWordDto.wordId,
      );

      const newVocabularyWord = this.vocabularyWordRepository.create({
        word,
        vocabulary: user.vocabulary,
      });

      await this.vocabularyWordRepository.save(newVocabularyWord);

      return true;
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id: number): Promise<VocabularyWord> {
    const word = await this.vocabularyWordRepository.findOneBy({ id });

    if (!word) {
      throw new NotFoundException(exceptions.vocabularies.wordNotFound);
    }

    return word;
  }

  async validateUser(userId: string, id: number) {
    try {
      const word = await this.vocabularyWordRepository.findOne({
        where: { id },
        relations: ['vocabulary', 'vocabulary.user'],
      });

      if (word.vocabulary.user.id !== userId) {
        throw new ForbiddenException(exceptions.vocabularies.forbidden);
      }

      return word;
    } catch (err) {
      console.log(err);
    }
  }

  async increaseStatus(userId: string, id: number, isBySchedule = false) {
    try {
      const word = await this.validateUser(userId, id);

      if (word.status === VocabularyWordsStatuses.CHECKED_MONTHLY) {
        throw new BadRequestException(exceptions.vocabularies.maxStatus);
      }

      await this.vocabularyWordRepository.update(
        { id },
        {
          ...word,
          status: ++word.status,
          isFailed: !isBySchedule ? false : word.isFailed,
        },
      );

      return this.findById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async decreaseStatus(userId: string, id: number, step: number = 1) {
    try {
      const word = await this.validateUser(userId, id);

      if (word.status <= VocabularyWordsStatuses.NEW) {
        throw new BadRequestException(exceptions.vocabularies.minStatus);
      }

      await this.vocabularyWordRepository.update(
        { id },
        {
          ...word,
          status: word.status - step,
          isFailed: true,
          failedTasks: ++word.failedTasks,
        },
      );

      return this.findById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async acceptWord(userId: string, id: number) {
    try {
      const word = await this.validateUser(userId, id);

      if (word.status > VocabularyWordsStatuses.NEW) {
        throw new BadRequestException(exceptions.vocabularies.alreadyAccepted);
      }

      await this.vocabularyWordRepository.update(
        { id },
        {
          ...word,
          status: VocabularyWordsStatuses.TO_DAILY,
        },
      );

      return this.findById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async rejectWord(userId: string, id: number) {
    try {
      const word = await this.validateUser(userId, id);

      if (word.status === VocabularyWordsStatuses.BANNED) {
        throw new BadRequestException(exceptions.vocabularies.alreadyBanned);
      }

      await this.vocabularyWordRepository.update(
        { id },
        {
          ...word,
          status: VocabularyWordsStatuses.BANNED,
        },
      );

      return this.findById(id);
    } catch (err) {
      console.log(err);
    }
  }
}
