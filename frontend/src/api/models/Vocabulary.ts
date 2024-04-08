export interface Vocabulary {
  id: number;
  isFull: boolean;
  vocabularyWords: VocabularyWord[];
}

export interface VocabularyWord {
  id: number;
  status: number;
  word: Word;
  isFailed: boolean;
  failedTasks: number;
  createdAt: Date
}

export interface Word {
  id: number;
  en: string;
  ru: string;
  tr: string;
  voice?: string;
}
