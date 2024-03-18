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
import { IsEmail, Length, Max, Min, MinLength } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({ default: 'friend' })
  @Length(2, 15)
  username: string;

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  password: string;

  @Column({ default: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Bear' })
  avatar: string;

  @Column({ default: 3 })
  @Min(1)
  @Max(5)
  wordPerDay: number;

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
