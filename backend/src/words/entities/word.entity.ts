import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VocabularyWord } from '../../vocabulary-words/entities/vocabulary-word.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({
    unique: true,
  })
  en: string;

  @Column()
  ru: string;

  @Column()
  tr: string;

  @Column({
    nullable: true,
  })
  voice?: string;

  @ManyToOne(() => VocabularyWord, (vocabularyWord) => vocabularyWord.word)
  vocabularyWords: VocabularyWord[];
}
