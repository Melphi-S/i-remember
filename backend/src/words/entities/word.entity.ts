import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
