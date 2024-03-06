import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyWordsService } from './vocabulary-words.service';

describe('VocabularyWordsService', () => {
  let service: VocabularyWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VocabularyWordsService],
    }).compile();

    service = module.get<VocabularyWordsService>(VocabularyWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
