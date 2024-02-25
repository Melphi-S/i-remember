import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from '../../tasks/entities/task.entity';
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

  @OneToMany(() => Task, (task) => task.user)
  @JoinColumn()
  tasks: Task[];
}
