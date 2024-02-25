import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';
import { VocabularuWordsStatuses } from '../types';
import { Task } from '../../tasks/entities/task.entity';
import {Word} from "../../words/entities/word.entity";

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

  @ManyToOne(() => Task, (task) => task.vocabularyWords, { nullable: true })
  @JoinColumn()
  task?: Task | null;

  @Column({ default: VocabularuWordsStatuses.NEW })
  status: VocabularuWordsStatuses;
}
