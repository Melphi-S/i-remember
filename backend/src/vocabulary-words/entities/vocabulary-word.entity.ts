import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';
import { VocabularyWordsStatuses } from '../types';
import { Word } from '../../words/entities/word.entity';

@Entity()
export class VocabularyWord {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Word, (word) => word.vocabularyWords, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  word: Word;

  @ManyToOne(() => Vocabulary, (vocabulary) => vocabulary.vocabularyWords)
  vocabulary: Vocabulary;

  @Column({ default: VocabularyWordsStatuses.NEW })
  status: VocabularyWordsStatuses;

  @Column({ default: false })
  isFailed: boolean;

  @Column({ default: 0 })
  failedTasks: number;
}
