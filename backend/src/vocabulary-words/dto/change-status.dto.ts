import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { VocabularyWordsStatuses } from '../types';

export class ChangeStatusDto {
  @IsNumber()
  id: number;

  @IsString()
  status: VocabularyWordsStatuses;

  @IsBoolean()
  isFailed: boolean;
}
