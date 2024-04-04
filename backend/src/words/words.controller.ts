import { Controller, Post, Body, Get } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  getAll() {
    return this.wordsService.getAll();
  }

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @Get('number')
  getNumberOfWords() {
    return this.wordsService.getNumberOfWords();
  }
}
