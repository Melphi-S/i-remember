import { IsNumber, IsString } from 'class-validator';

export class CreateVocabularyWordDto {
  @IsString()
  userId: string;

  @IsNumber()
  wordId: number;
}
