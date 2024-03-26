import { Module } from '@nestjs/common';
import { VocabularyWordsService } from './vocabulary-words.service';
import { VocabularyWordsController } from './vocabulary-words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VocabularyWord } from './entities/vocabulary-word.entity';
import { UsersModule } from '../users/users.module';
import { WordsModule } from '../words/words.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VocabularyWord]),
    UsersModule,
    WordsModule,
  ],
  controllers: [VocabularyWordsController],
  providers: [VocabularyWordsService],
  exports: [VocabularyWordsService],
})
export class VocabularyWordsModule {}
