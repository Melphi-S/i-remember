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
import { VocabularyWordsService } from '../vocabulary-words/vocabulary-words.service';
import { WordsService } from '../words/words.service';
import { VocabularyWordsStatuses } from '../vocabulary-words/types';
import {
  getDaysBetween,
  oneDay,
  oneMonth,
  oneWeek,
} from '../common/constants/dates';

@Injectable()
export class VocabulariesService {
  constructor(
    @InjectRepository(Vocabulary)
    private readonly vocabularyRepository: Repository<Vocabulary>,
    private readonly userService: UsersService,
    private readonly vocabularyWordsService: VocabularyWordsService,
    private readonly wordsService: WordsService,
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

  async findAll() {
    return this.vocabularyRepository.find({
      relations: ['user'],
    });
  }

  async getNewWords(
    id: number,
    userId: string,
    wordsToAdd: number,
  ): Promise<Vocabulary> {
    const vocabulary = await this.findById(id);

    const userWords: Map<number, boolean> = new Map();

    vocabulary.vocabularyWords.forEach((word) => {
      userWords.set(word.word.id, true);
    });

    const words = await this.wordsService.getAll();

    const freeWords = words.filter((word) => !userWords.has(word.id));

    for (let i = 0; i < wordsToAdd; i++) {
      if (freeWords.length < 1) {
        await this.closeVocabulary(id);
        break;
      }
      const index = Math.floor(Math.random() * freeWords.length);
      const newWord = freeWords[index];
      freeWords.splice(index, 1);

      await this.vocabularyWordsService.create({ userId, wordId: newWord.id });
    }

    return this.findById(id);
  }

  async getTasks(id: number, userId: string) {
    const vocabulary = await this.findById(id);

    const now = new Date();

    const wordsToDailyTask = vocabulary.vocabularyWords.filter(
      (word) =>
        word.status === VocabularyWordsStatuses.TO_DAILY &&
        getDaysBetween(now, new Date(word.updatedAt)) >= oneDay,
    );

    const wordsToWeeklyTask = vocabulary.vocabularyWords.filter(
      (word) =>
        word.status === VocabularyWordsStatuses.CHECKED_DAILY &&
        getDaysBetween(now, new Date(word.updatedAt)) >= oneWeek,
    );

    const wordsToMonthlyTask = vocabulary.vocabularyWords.filter(
      (word) =>
        word.status === VocabularyWordsStatuses.CHECKED_WEEKLY &&
        getDaysBetween(now, new Date(word.updatedAt)) >= oneMonth,
    );

    for (let i = 0; i < wordsToDailyTask.length; i++) {
      await this.vocabularyWordsService.increaseStatus(
        userId,
        wordsToDailyTask[i].id,
        true,
      );
    }

    for (let i = 0; i < wordsToWeeklyTask.length; i++) {
      await this.vocabularyWordsService.increaseStatus(
        userId,
        wordsToWeeklyTask[i].id,
        true,
      );
    }

    for (let i = 0; i < wordsToMonthlyTask.length; i++) {
      await this.vocabularyWordsService.increaseStatus(
        userId,
        wordsToMonthlyTask[i].id,
        true,
      );
    }
  }

  async distributeBySchedule() {
    const vocabularies = await this.findAll();

    for (let i = 0; i < vocabularies.length; i++) {
      const vocabulary = vocabularies[i];

      if (vocabulary.vocabularyWords.length) {
        await this.getNewWords(
          vocabulary.id,
          vocabulary.user.id,
          vocabulary.user.wordsPerDay,
        );
        await this.getTasks(vocabulary.id, vocabulary.user.id);
      }
    }
  }

  async closeVocabulary(id: number) {
    await this.vocabularyRepository.update({ id }, { isFull: true });
    return true;
  }
}
