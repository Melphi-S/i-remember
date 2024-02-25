import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyWordsController } from './vocabulary-words.controller';
import { VocabularyWordsService } from './vocabulary-words.service';

describe('VocabularyWordsController', () => {
  let controller: VocabularyWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VocabularyWordsController],
      providers: [VocabularyWordsService],
    }).compile();

    controller = module.get<VocabularyWordsController>(VocabularyWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
