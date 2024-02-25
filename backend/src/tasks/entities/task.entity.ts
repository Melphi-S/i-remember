import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskType } from '../types';
import { User } from '../../users/entities/user.entity';
import { VocabularyWord } from '../../vocabulary-words/entities/vocabulary-word.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  type: TaskType;

  @OneToMany(() => VocabularyWord, (vocabularyWord) => vocabularyWord.task)
  @JoinColumn()
  vocabularyWords?: VocabularyWord[];

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  user: User;
}
