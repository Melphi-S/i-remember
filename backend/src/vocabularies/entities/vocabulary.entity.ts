import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { VocabularyWord } from '../../vocabulary-words/entities/vocabulary-word.entity';

@Entity()
export class Vocabulary {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isFull: boolean;

  @OneToOne(() => User, (user) => user.vocabulary)
  user: User;

  @OneToMany(
    () => VocabularyWord,
    (vocabularyWord) => vocabularyWord.vocabulary,
    {
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn()
  vocabularyWords?: VocabularyWord[];
}
