import { Injectable } from '@nestjs/common';
import { CreateVocabularyWordDto } from './dto/create-vocabulary-word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VocabularyWord } from './entities/vocabulary-word.entity';
import { UsersService } from '../users/users.service';
import { WordsService } from '../words/words.service';

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
}
