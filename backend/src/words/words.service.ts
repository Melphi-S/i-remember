import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async create(createWordDto: CreateWordDto): Promise<Word> {
    const newWord = this.wordRepository.create(createWordDto);

    return this.wordRepository.save(newWord);
  }

  async getAll(): Promise<Word[]> {
    return this.wordRepository.find();
  }

  async getNumberOfWords(): Promise<number> {
    const words = await this.wordRepository.find();
    return words.length;
  }

  async findById(id: number) {
    return this.wordRepository.findOneBy({ id });
  }
}
