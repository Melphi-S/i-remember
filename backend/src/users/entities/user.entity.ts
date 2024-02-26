import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Vocabulary } from '../../vocabularies/entities/vocabulary.entity';
import { UserStatuses } from '../types';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserStatuses.PENDING })
  status: string;

  @Column({ select: false, default: null })
  @Exclude()
  resetCode: string | null;

  @OneToOne(() => Vocabulary, (vocabulary) => vocabulary.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  vocabulary: Vocabulary;
}
