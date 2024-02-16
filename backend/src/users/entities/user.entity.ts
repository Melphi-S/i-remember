import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ select: false })
  @Exclude()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
