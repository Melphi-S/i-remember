import { Body, Controller, Post } from '@nestjs/common';
import { VocabularyWordsService } from './vocabulary-words.service';
import { CreateVocabularyWordDto } from './dto/create-vocabulary-word.dto';

@Controller('vocabulary-words')
export class VocabularyWordsController {
  constructor(
    private readonly vocabularyWordsService: VocabularyWordsService,
  ) {}

  @Post()
  create(@Body() createVocabularyWordDto: CreateVocabularyWordDto) {
    return this.vocabularyWordsService.create(createVocabularyWordDto);
  }
}
